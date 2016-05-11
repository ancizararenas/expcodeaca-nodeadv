var mongoose    = require('mongoose');
var express     = require('express');
var app         = express();
var mongoURI    = process.env.MONGO || 'mongodb://localhost:27017/nodeadvca';
var log         = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

// set port for server
var port = process.env.PORT || 3000;

// connect app to database
mongoose.connect(mongoURI);

app.listen(port);
