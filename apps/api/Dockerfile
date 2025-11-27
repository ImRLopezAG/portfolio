FROM oven/bun:1.3-alpine AS base

WORKDIR /usr/src/app


FROM base AS build

# Install build tools for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

COPY package.json .
COPY . .

# Install production deps (bun handles native deps)
RUN bun install --production

# Build Strapi
RUN bun run build


# Use Node.js for runtime (Strapi requires Node.js, not Bun)
FROM node:24-alpine AS final

WORKDIR /usr/src/app

# Install build tools to rebuild native modules for Node.js
RUN apk add --no-cache python3 make g++

ENV NODE_ENV=production

COPY package.json .
COPY tsconfig.json .

# Copy node_modules, dist, and source files
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/config ./config
COPY --from=build /usr/src/app/favicon.png ./favicon.ico

# Rebuild native modules for Node.js runtime
RUN npm rebuild better-sqlite3

# Create directories and assign to node user
RUN mkdir -p .tmp database/migrations && chown -R node:node .tmp database

USER node

CMD ["node", "--run", "start"]
