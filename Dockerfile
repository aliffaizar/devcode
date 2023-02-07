FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2
RUN npm install --only=production

COPY . .

EXPOSE 3030

CMD ["pm2-runtime", "start", "./src/index.js", "-i", "max", "--name", "devcode"]

