var mongoose    = require('mongoose');
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var router      = express.Router();
var routes      = require('../lib/routes');
var mongoURI    = process.env.MONGO || 'mongodb://localhost:27017/nodeadvca';
var log         = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

// connect app to database
log.info("Connecting to DB %s", mongoURI);
mongoose.connect(mongoURI);

mongoose.connection.on('connected', function () {
  log.info("Successfully connected to DB %s", mongoURI);
  startServer();
});
mongoose.connection.on('error', function (err) {
  log.error("Error connecting to DB %s", mongoURI, err);
});

// middleware to use for all requests
router.use(function(req, res, next) {
  log.info({req : req},
    {message : req.method + ' - request being made to - ' + req.originalUrl});
  next(); // make sure we go to the next routes and don't stop here
});

function startServer() {
  // set port for server
  var port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  routes.register(router);
  app.use('/', router);

  app.listen(port);
  log.info("Server started on port %s", port);
}
