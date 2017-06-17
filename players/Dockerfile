FROM node
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . .
RUN npm install
CMD ["node", "app.js"]