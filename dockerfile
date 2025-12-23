FROM node:20-bullseye

# Instalar LibreOffice + fuentes
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    fonts-dejavu \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --production

ENV SOFFICE_PATH=/usr/bin/soffice
ENV HOME=/tmp
RUN mkdir -p /tmp/libreoffice && chmod -R 777 /tmp/libreoffice

COPY . .

EXPOSE 3990
CMD ["node", "index.js"]