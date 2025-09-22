FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm


FROM base AS builder
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build


FROM base AS runtime
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["pnpm", "run", "start"]
