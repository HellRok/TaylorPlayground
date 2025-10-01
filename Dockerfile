# Examples
FROM ruby AS examples
WORKDIR /app
COPY bin/build .
COPY app/playgrounds ./app/playgrounds/

RUN mkdir -p app/javascripts/lib && \
  ./build

# Website
FROM node:22 AS website
WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/
COPY --from=examples /app/app/javascripts/lib/example_data.ts /app/app/javascripts/lib/
ENV NODE_ENV=production
RUN npm run build

# Playground v0.3.14.1
FROM hellrok/taylor:web-v0.3.14.1 AS playground-v0.3.14.1
WORKDIR /app
COPY app/playgrounds/v0.3 \
  bin/docker/build-playground \
  /app/game/

COPY app/playgrounds/assets /app/game/assets/

RUN /app/game/build-playground

# Final result
FROM debian:latest AS final
RUN apt-get update && \
  apt-get install nginx gettext -y

WORKDIR /app

ENV PORT=3000

COPY --from=website \
  /app/docker/start_server.sh \
  /app/docker/nginx.conf.template \
  /app/
RUN mkdir -p /app/log/
COPY --from=website /app/dist /app/html/

COPY --from=playground-v0.3.14.1 /app/game/exports /app/html/v0.3.14.1/

CMD ["/app/start_server.sh"]
