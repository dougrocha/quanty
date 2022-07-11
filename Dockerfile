
FROM node:alpine AS builder
ARG BUILD_CONTEXT
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=${BUILD_CONTEXT} --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

FROM node:alpine AS sourcer
ARG BUILD_CONTEXT
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=${BUILD_CONTEXT} --include-dependencies --no-deps

EXPOSE 1-65000

CMD [ "yarn", "start" ]