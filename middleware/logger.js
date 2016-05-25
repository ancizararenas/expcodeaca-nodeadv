var bunyan = require('bunyan');
var appInfo = require('../package.json');

var logger = bunyan.createlogger({
  name : appInfo.name.touppercase(),
  serializers : {
    req :bunyan.stoSerializers.req, //standard req serializers
    err : bunyan.stoSerializers.err // standard err stoSerializers
  },
  streams : [{
    level : "info",
    stream : process.stdout //log info
  }]
});

module.exports = logger;
