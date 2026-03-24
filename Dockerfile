############################################
# Base
############################################
FROM node:20-alpine AS base

# openssl é necessário para o motor do Prisma funcionar no Alpine Linux
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

############################################
# Dependencies
############################################
FROM base AS deps

# Copia o package.json e QUALQUER lockfile que você tiver no projeto
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Identifica qual gerenciador você usa e instala as dependências corretamente
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Erro: Nenhum lockfile encontrado. Faça o commit do seu package-lock.json, yarn.lock ou pnpm-lock.yaml" && exit 1; \
  fi

############################################
# Builder
############################################
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED=1

# Executa o build do Next.js usando o gerenciador de pacotes correto
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Erro: Nenhum lockfile encontrado." && exit 1; \
  fi

############################################
# Runner (Produção)
############################################
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN apk add --no-cache openssl

# Configura usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copia os arquivos públicos
COPY --from=builder /app/public ./public

# Cria a pasta .next com as permissões corretas
RUN mkdir -p .next \
 && chown -R nextjs:nodejs .next public

# Copia os arquivos do build (modo standalone do Next.js)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# =================================================================
# CORREÇÃO CRÍTICA DO PRISMA: Copiar o Client gerado explicitamente
# =================================================================
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copia a pasta prisma 
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# Inicia a aplicação (apenas o servidor, sem mexer no banco de dados)
CMD ["node", "server.js"]