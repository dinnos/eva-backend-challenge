FROM node:12-alpine

# Creates app folder
WORKDIR /app

# Copy dependency files into /app
COPY . .

RUN npm cache clean --force && npm install

CMD npm start
