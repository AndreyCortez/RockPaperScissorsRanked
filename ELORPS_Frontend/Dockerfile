# Estágio 1: Build da aplicação React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servir os arquivos com Nginx
FROM nginx:1.25-alpine

# A MUDANÇA ESTÁ AQUI 👇
# Copia os arquivos da 'dist' para uma subpasta 'elo-rps'
COPY --from=builder /app/dist /usr/share/nginx/html/elo-rps

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]