FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# FROM base AS builder
# COPY package.json pnpm-lock.yaml* ./
# RUN pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm run build


FROM base AS runtime
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile  
##--prod
# COPY --from=builder /app/dist ./dist
COPY . .
RUN pnpm run build
ENV NODE_ENV=production
EXPOSE 3001
CMD ["pnpm", "run", "start"]