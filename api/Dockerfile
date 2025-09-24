FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS runtime
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile  

COPY . .
RUN pnpm run build
ENV NODE_ENV=production
EXPOSE 3001
CMD ["pnpm", "run", "start"]


# I'm installing all dependencies (including devDependencies) because the migration
# CLI (`kysely-ctl`) is currently in devDependencies. This ensures that the
# container has the necessary tooling to run migrations on startup.
# 
# If in the future we move `kysely-ctl` into regular dependencies, this line
# can safely switch back to `pnpm install --frozen-lockfile --prod` to exclude
# development-only packages and keep the image smaller.


# I intentionally do not run migrations directly in the Dockerfile build step.
# Running migrations at build-time could cause issues if multiple containers
# are deployed concurrently (risk of applying the same migration more than once).
# Instead, migrations should be executed as part of the application startup or
# a separate deployment step, ensuring they only run once in a controlled manner ( which is what I did eventually)