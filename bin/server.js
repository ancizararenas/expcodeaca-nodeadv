var mongoose    = require('mongoose');
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var mongoURI    = process.env.MONGO || 'mongodb://localhost:27017/nodeadvca';
var log         = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});
//var router      = express.Router();

// set port for server
var port = process.env.PORT || 3000;

var routes      = require('../routes.js');

// connect app to database
log.info('Connecting to DB: %s', mongoURI);
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(err) {
  log.error('Error connecting to DB: %s', mongoURI, err);
});

mongoose.connection.on('open', function(err) {
  log.info('Connected to DB: %s', mongoURI);
  return instantiateRouter();
});

function instantiateRouter() {
  // bodyparser() - work with data in POSt/PUT req
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // set port for server
  var port = process.env.PORT || 3000;

  // instantiate express router
  //var router = express.Router();

  // app.use(router);
  app.use('/', routes);

  app.listen(port);
  log.info('Listening on: %', port);
};

console.log;
