FROM node:24-alpine AS build

WORKDIR /usr/src/app

# Install build tools for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

COPY package.json .
COPY . .

# Copy seed database if it exists (will be used later)
RUN mkdir -p /seed && (cp .tmp/data.db /seed/data.db 2>/dev/null || true)

# update npm to latest
RUN npm install -g npm@latest
# Install production deps
RUN npm install --omit=dev --legacy-peer-deps

# Build Strapi
RUN npm run build


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
RUN mkdir -p .tmp database/migrations seed && chown -R node:node .tmp database seed

# Copy seed database from build stage (directory always exists, may be empty)
COPY --from=build --chown=node:node /seed/ seed/

# Copy entrypoint script
COPY --chown=node:node docker-entrypoint.sh /usr/src/app/
RUN chmod +x /usr/src/app/docker-entrypoint.sh

USER node

CMD ["/usr/src/app/docker-entrypoint.sh"]
