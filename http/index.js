var resource  = require('resource'),
    http = resource.define('http');

http.schema.description = "provides an HTTP server API";

http.property("port", {
  "type": "number",
  "default": 8888,
  "description": "the port to listen on "
});

http.property("host", {
  "type": "string",
  "default": "0.0.0.0", 
  "description": "the host interface to listen on"
});

http.property("root", {
  "type": "string",
  "default": __dirname + '/public'
});

http.method('listen', listen, {
  "description": "starts a listening http server",
  "properties": {
    "options": {
      "type": "object",
      "properties": {
        "port": http.schema.properties['port'],
        "host": http.schema.properties['host'],
        "root": http.schema.properties['root'],
        "enableUploads": {
          "type": "boolean",
          "default": true
        }
      }
    },
    "callback": {
      "description": "the callback executed after server listen",
      "type": "function",
      "required": false
    }
  }
});

function listen (options, callback) {
  options = options || {};

  var server;

  var connect = require('connect'),
      express = require('express');

  var app = express();

  if(typeof options.root !== 'undefined') {
    app
      .use(connect.static(options.root))
      .use(connect.directory(options.root));
  }

  app
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.cookieParser())
    .use(connect.session({ secret: 'my secret here' }));

  if(options.enableUploads === true) {
    app
    .use(express.bodyParser({
      uploadDir: __dirname + '/uploads',
      keepExtensions: true
    }));
  }

   http.server = server = require('http').createServer(app).listen(options.port, options.host, function (){
      callback(null, server);
   });

   app.get('/', function (req, res){
     res.end('home');
   });

   //
   // Bind app instance to http resource
   //
   http.app = app;

}

exports.http = http;

exports.dependencies = {
  "connect": "*",
  "express": "*"
};