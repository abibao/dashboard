FROM mhart/alpine-node:5.5

MAINTAINER Gilles Perreymond <gperreymond@gmail.com>

RUN mkdir -p /usr/app && \
  mkdir -p /usr/app/dist && \
  mkdir -p /usr/app/src
WORKDIR /usr/app

COPY index.js /usr/app/
COPY package.json /usr/app/
COPY gulpfile.js /usr/app/
ADD src /usr/app/src

RUN apk add --update make bash git libpng-dev gcc g++ python && \
  npm install && \
  npm install -g gulp bower && \
  gulp build && \
  rm -rf src && \
  rm -rf node_modules && \
  npm uninstall -g gulp bower && \
  npm install --production && \
  npm uninstall -g npm && \
  apk del make bash git libpng-dev gcc g++ python && \
  rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 80
CMD node .
