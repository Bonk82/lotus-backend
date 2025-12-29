FROM node:20-bullseye-slim

ENV CARBONE_URL=http://carbone:4000
# 3. Crear directorio de trabajo y permisos
WORKDIR /app

# 4. Instalar dependencias de Node primero (para aprovechar caché de capas)
COPY package*.json ./
RUN npm install --production

# 5. Copiar el resto del código
COPY . .


EXPOSE 3990
CMD ["node", "index.js"]