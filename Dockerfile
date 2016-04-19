FROM mhart/alpine-node:5.5

MAINTAINER Gilles Perreymond <gperreymond@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY index.js /usr/src/app/
COPY package.json /usr/src/app/
COPY gulpfile.js /usr/src/app/
ADD src /usr/src/app/src

RUN apk add --update make gcc g++ python && \
  npm install && \
  npm install -g gulp bower && \
  gulp build && \
  rm -rf src && \
  rm -rf node_modules && \
  npm uninstall -g gulp bower && \
  npm install --production && \
  npm uninstall -g npm && \
  apk del make gcc g++ python && \
  rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

EXPOSE 80
CMD node .
