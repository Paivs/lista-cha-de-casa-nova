# Etapa de construção (build)
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Etapa de produção
FROM node:18-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Instala curl para o healthcheck
RUN apk add --no-cache curl

# Copia apenas o necessário da etapa de builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
