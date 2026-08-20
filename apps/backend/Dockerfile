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
# Copy build artifacts so index.html is available wherever medusa start is executed
RUN cp -r .medusa/server/public ./public 2>/dev/null || true
RUN cp -r .medusa /app/.medusa 2>/dev/null || true
RUN cp -r .medusa/server/public /app/public 2>/dev/null || true

ENV NODE_ENV=production

# Run migrations and start medusa backend
CMD ["sh", "-c", "cd /app/apps/backend && npx medusa db:migrate && npx medusa start"]
