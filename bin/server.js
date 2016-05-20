'use strict';

var mongoose   = require('mongoose');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoURI   = process.env.MONGO || 'mongodb://localhost:27017/cc-nodeadv-api';
var appInfo    = require('../package.json');
var routes     = require('../lib/routes');
var log   = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

// connect app to our database
log.info('preparing to initiate connection to DB');
mongoose.connect(mongoURI); // connect to our database

mongoose.connection.on('error', function(err) {
  log.error('error connecting to DB : %s', mongoURI, err);
});

mongoose.connection.on('open', function() {
  log.info('successful connected to DB : %s', mongoURI);
  return instantiateServer();
});

/**
 * Function responsible for starting server once database connection
 * verified as successful
 */
function instantiateServer() {
  // configure app to use bodyParser() this will let us get the data from a POST & PUT requests
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // set our port
  var port = process.env.PORT || 3001;

  // instantiate express router - new from Express 4.0 ^
  var router = express.Router();

  // middleware to use for all requests
  router.use(function(req, res, next) {
    log.info({req : req},
      {message : req.method + ' - request being made to - ' + req.originalUrl});
    next(); // make sure we go to the next routes and don't stop here
  });

  // register application routes
  routes.register(router);

  // all of our routes will be prefixed with /{apiName}
  app.use('/', router);

  // START THE SERVER
  app.listen(port);

  log.info('server started and listening on port : %s', port);
}

//TODO :: IMPLEMENT SERVER API KEY FOR SECURITY

//TODO :: IMPLEMENT UNIQUE UUID FOR ALL REQUESTS

//TODO :: IMPLEMENT API VERSION INTO HEADERS
