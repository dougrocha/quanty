FROM node:alpine AS builder
ARG BUILD_CONTEXT

WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY ./apps/$BUILD_CONTEXT/package.json apps/$BUILD_CONTEXT/
RUN yarn install