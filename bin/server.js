var mongoose    = require('mongoose');
var express     = require('express');
var bodyParser  = require('body-parser');
var routes      = require('../lib/routes');
var app         = express();
var mongoURI    = process.env.MONGO || 'mongodb://localhost:27017/nodeadvca';
var log         = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

// set port for server
var port = process.env.PORT || 8999;

// connect app to database
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(err){
  log.error('error connecting to DB :%s', mongoURI, err);

})

mongoose.connection.on('open', function(err){
  log.info('successfully connecting to DB :%s', mongoURI);
  instantiateServer()
})


function instantiateServer(){

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  var router = express.Router();
  routes.register(router);

  app.use('/', router);
  app.set('port', port);
  app.listen(port);
  console.log('listenin on port : %s', port);

};
