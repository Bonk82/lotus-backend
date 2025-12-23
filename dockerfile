# -------- Stage 1: LibreOffice + Carbone EE --------
FROM carbone/carbone-ee:latest AS carbone

# -------- Stage 2: Node + tu app --------
FROM node:20-bullseye

# Copiar LibreOffice desde carbone-ee
COPY --from=carbone /usr/lib/libreoffice /usr/lib/libreoffice
COPY --from=carbone /usr/bin/soffice /usr/bin/soffice
COPY --from=carbone /usr/share/fonts /usr/share/fonts

ENV SOFFICE_PATH=/usr/bin/soffice
ENV HOME=/tmp

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3990
CMD ["node", "index.js"]