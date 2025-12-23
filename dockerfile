FROM node:20-bullseye

# Evitar prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV HOME=/tmp
ENV SOFFICE_PATH=/usr/bin/soffice

# Instalar LibreOffice + fuentes
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    libxinerama1 \
    libfontconfig1 \
    libdbus-glib-1-2 \
    libcairo2 \
    libcups2 \
    libglu1-mesa \
    libsm6 \
    libnss3 \
    fonts-dejavu \
    fonts-liberation \
    && fc-cache -f -v \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3990
CMD ["node", "index.js"]