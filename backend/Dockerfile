FROM node:14

LABEL version="1.0.0"
LABEL description="App de zona de alumnas de coro femenino Elasong."
LABEL maintainer = ["dascaseiro@gmail.es"]

WORKDIR /app

COPY . .

RUN npm install --production
RUN npm install nodemon

EXPOSE 5000

CMD ["node", "app.js"]
