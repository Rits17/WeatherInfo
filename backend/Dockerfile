FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./index.js ./index.js
COPY ./config ./config
COPY ./routes ./routes
COPY ./middleware ./middleware
COPY ./controller ./controller
COPY ./models ./models
COPY ./views ./views
RUN npm install
EXPOSE 3500
CMD ["node","index.js"]
