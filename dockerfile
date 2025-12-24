FROM node:20-bullseye-slim

# 1. Definir variables de entorno
ENV DEBIAN_FRONTEND=noninteractive \
    HOME=/tmp \
    # Forzar a LibreOffice a no buscar una pantalla X11
    SAL_USE_VCLPLUGIN=gen \
    SOFFICE_PATH=/usr/bin/soffice

# 2. Instalar solo lo esencial
# Usamos --no-install-recommends para evitar paquetes basura
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-common \
    libreoffice-writer \
    libreoffice-calc \
    libx11-6 \
    libxrender1\
    # Dependencias mínimas de sistema para ejecución headless
    libxinerama1 \
    libfontconfig1 \
    libdbus-glib-1-2 \
    libcairo2 \
    libcups2 \
    libglu1-mesa \
    libsm6 \
    libnss3 \
    # Fuentes esenciales (importante para que el PDF no se vea mal)
    fonts-dejavu \
    fonts-liberation \
    # Limpieza inmediata para reducir tamaño de imagen
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Añade esto antes del WORKDIR
RUN chmod +x /usr/bin/soffice /usr/bin/libreoffice

# Crea el directorio donde Carbone/LibreOffice escribirán los temporales
RUN mkdir -p /tmp/carbone && chmod -R 777 /tmp/carbone

# 3. Crear directorio de trabajo y permisos
WORKDIR /app

# 4. Instalar dependencias de Node primero (para aprovechar caché de capas)
COPY package*.json ./
RUN npm install --production

# 5. Copiar el resto del código
COPY . .


EXPOSE 3990
CMD ["node", "index.js"]