'use strict';

var bunyan  = require('bunyan');
var appInfo = require('../package.json');

var logger = bunyan.createLogger({
  name : appInfo.name.toUpperCase(),
  serializers : {
    req : bunyan.stdSerializers.req, // standard bunyan req serializer
    err : bunyan.stdSerializers.err // standard bunyan error serializer
  },
  streams : [
    {
      level : 'info', // logging level
      stream : process.stdout // log INFO and above to stdout
    }
  ]
});

module.exports = logger;
