var mongoose    = require('mongoose');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoURI    = process.env.MONGO || 'mongodb://localhost:27017/nodeadvcodeacademy';
var log         = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

var port = process.env.PORT || 3001;

app.listen(port);




function instantiateServer() {
    log.info('Server started and listening on port : %s', port);
}
