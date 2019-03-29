FROM node:8.7.0 as build

WORKDIR /app
COPY . ${WORKDIR}
RUN npm install

FROM node:8.7.0-alpine

WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000
CMD npm run start
