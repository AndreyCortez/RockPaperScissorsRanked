# Estágio 1: Build da aplicação React
# Usamos uma imagem oficial do Node.js como base
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Roda o comando de build do Vite para gerar os arquivos estáticos
RUN npm run build

# Estágio 2: Servir os arquivos com Nginx
# Usamos uma imagem leve e oficial do Nginx
FROM nginx:1.25-alpine

# Copia os arquivos estáticos gerados no estágio anterior (da pasta 'dist')
# para a pasta padrão que o Nginx usa para servir conteúdo
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração customizado do Nginx (opcional, mas bom para roteamento)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão do HTTP
EXPOSE 80

# O comando que inicia o servidor Nginx quando o contêiner rodar
CMD ["nginx", "-g", "daemon off;"]