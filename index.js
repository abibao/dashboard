'use strict';

var path = require('path');
var Hapi = require("hapi");
var Inert = require('inert');

var nconf = require("nconf");
nconf.argv().env().file({ file: 'nconf-env.json' });

var options = {
  host: nconf.get("ABIBAO_DASHBOARD_EXPOSE_IP"),
  port: nconf.get("ABIBAO_DASHBOARD_EXPOSE_PORT")
};

var server = new Hapi.Server({
  debug: false,
  connections: {
    routes: {
      cors: true
    }
  }
});

server.connection(options);
server.register(Inert, function () {});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.normalize(path.resolve(__dirname, "www")),
      defaultExtension: "html",
      index: true
    }
  }
});

server.start(function(err) {
  if (err) {
    return console.dir(err);
  }
  console.log('server running at:', server.info.uri);
});