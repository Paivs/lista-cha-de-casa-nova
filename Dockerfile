# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia e instala as dependências
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copia o restante do código e gera a build
COPY . .
RUN npm run build

# Etapa de produção
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

# Instala curl para o healthcheck
RUN apk add --no-cache curl

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Porta da aplicação
EXPOSE 3000

# Healthcheck incorporado no Dockerfile (opcional)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=5 \
  CMD curl -f http://localhost:3000 || exit 1

# Comando padrão
CMD ["npm", "start"]
