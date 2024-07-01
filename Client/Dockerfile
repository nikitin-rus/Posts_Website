FROM node:18-alpine AS dev
WORKDIR /app
COPY . .
EXPOSE 5173
CMD npm i && \
    npm run dev

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm i && \
    npm run build

FROM nginx:stable-alpine3.19 AS prod
COPY --from=build /app/dist /usr/share/nginx/html/dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173