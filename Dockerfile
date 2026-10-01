# syntax=docker/dockerfile:1

ARG NODE_VERSION=22-alpine

# ---- Base: Node + pnpm (version pinned by package.json "packageManager") ----
FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat openssl
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

# ---- Deps: install all dependencies (postinstall runs `prisma generate`) ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts ./
COPY prisma ./prisma
# prisma.config.ts requires DATABASE_URL; generate doesn't connect, so a placeholder is enough.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    corepack install && pnpm install --frozen-lockfile

# ---- Builder: build the standalone Next.js server ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN corepack install && pnpm build

# ---- Migrator: minimal Prisma CLI to run `migrate deploy` at startup ----
FROM base AS migrator
WORKDIR /migrate
COPY --from=deps /app/package.json /tmp/package.json
RUN PRISMA_VERSION=$(node -p "require('/tmp/package.json').devDependencies.prisma.replace(/^[\^~]/, '')") \
 && DOTENV_VERSION=$(node -p "require('/tmp/package.json').devDependencies.dotenv.replace(/^[\^~]/, '')") \
 && echo '{"name":"migrate","private":true}' > package.json \
 && npm install --omit=dev --no-audit --no-fund "prisma@${PRISMA_VERSION}" "dotenv@${DOTENV_VERSION}" \
 && npm cache clean --force
COPY prisma.config.ts ./
COPY prisma ./prisma

# ---- Runner: production image ----
FROM node:${NODE_VERSION} AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=migrator --chown=nextjs:nodejs /migrate /migrate
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" >/dev/null || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
