# Dockerfile for lux-dao subgraph

FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm codegen
RUN pnpm build

CMD ["pnpm", "deploy-local"]
