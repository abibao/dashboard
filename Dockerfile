FROM mhart/alpine-node:6

MAINTAINER Gilles Perreymond <gperreymond@gmail.com>

RUN mkdir -p /usr/app && \
    mkdir -p /usr/app/dist && \
    mkdir -p /usr/app/src

WORKDIR /usr/app

COPY index.js /usr/app/
COPY package.json /usr/app/
COPY gulpfile.js /usr/app/
ADD src /usr/app/src

RUN apk add --update make bash git libpng-dev gcc g++ python

RUN npm install && \
    npm install -g gulp bower && \
    gulp build && \
    npm uninstall -g gulp bower

RUN npm prune --production && \
    npm uninstall -g npm && \
    apk del autoconf automake make libtool nasm bash git libpng-dev gcc g++ python && \
    rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp && \
    rm -rf src/

RUN chmod + start-server.sh

EXPOSE 80
CMD node index.js
