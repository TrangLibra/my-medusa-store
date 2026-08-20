FROM node:20-alpine
RUN npm install -g pnpm@10.11.1
WORKDIR /app

# Copy all project files
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile=false

# Build backend directly inside apps/backend
WORKDIR /app/apps/backend
RUN npx medusa build
# Copy .medusa to root as well so both /app and /app/apps/backend have index.html
RUN cp -r .medusa /app/.medusa || true

ENV NODE_ENV=production

# Run directly inside apps/backend
CMD ["sh", "-c", "cd /app/apps/backend && npx medusa start"]
