# Use a imagem Node.js como base
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .
COPY .env .env

# Compile a aplicação Next.js
RUN npm run build

# Exponha a porta que a aplicação Next.js vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
