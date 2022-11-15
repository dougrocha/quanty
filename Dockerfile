
FROM node:alpine AS builder
ARG BUILD_CONTEXT
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN echo "Pruning: $BUILD_CONTEXT"
RUN turbo prune --scope=$BUILD_CONTEXT --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
ARG BUILD_CONTEXT
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --immutable

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN echo "Building: $BUILD_CONTEXT"
ENV NODE_ENV=production
RUN yarn turbo run build --filter=${BUILD_CONTEXT}

FROM node:alpine AS runner

COPY --from=installer /app .

EXPOSE 1-65000
CMD ["yarn", "start"]