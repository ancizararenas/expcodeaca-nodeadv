var mongoose    = require('mongoose');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoURI    = process.env.MONGO || 'mongodb://localhost:27017/nodeadvca';
var routes      = require('../lib/routes');
var log         = require('../middleware/logger').child({
  level : 'info',
  component : '[BIN-SERVER]'
});

function instantiateServer() {
	// configure app to use bodyParser() this will let us get the data from a POST & PUT requests
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// set port for server
	var port = process.env.PORT || 3000;

	app.use(routes);
	
	routes.use(function(req, res, next) {
		log.info({ req: req },
				{ message: req.method + ' - request being made to - ' + req.originalUrl });
	});

	app.listen(port);

	log.info('Server started and listening on port: %s', port);
}

// connect app to database
log.info('Preparing to initiate connection to DB');
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(err) {
	log.info('Error connecting to DB: %s', mongoURI, err);
});

mongoose.connection.on('open', function() {
	log.info('Successfully connected to DB: %s', mongoURI);
	return instantiateServer();
});