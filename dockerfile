FROM carbone/carbone-ee:latest

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3990
CMD ["node", "index.js"]