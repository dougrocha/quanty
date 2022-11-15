
FROM node:alpine AS builder
ARG BUILD_CONTEXT

RUN apk add --no-cache libc6-compat

RUN apk update
# Set working directory
WORKDIR /app
RUN yarn set version berry
COPY . .
RUN echo "Pruning: $BUILD_CONTEXT"
RUN yarn dlx turbo prune --scope=$BUILD_CONTEXT --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
ARG BUILD_CONTEXT
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN echo "Installing: $BUILD_CONTEXT"
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN echo "Building: $BUILD_CONTEXT"
RUN yarn turbo run build --filter=${BUILD_CONTEXT}... --include-dependencies --no-deps

FROM node:alpine AS runner
WORKDIR /app

COPY --from=installer /app .

EXPOSE 1-65000
# TODO: Eventually make this file a template and pass in the command
CMD node apps/api/dist/src/main.js
