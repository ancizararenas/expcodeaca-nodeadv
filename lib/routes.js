'use strict';

var appInfo   = require('../package.json');
var log       = require('../middleware/logger').child({
      level : 'info',
      component : '[LIB-ROUTES]'
    });

/**
 * function to register the REST API routes
 * @param router - express.Router object
 */
function registerRoutes(router) {
  log.info('registering routes');

  // test status endpoint to verify api router working
  router.get('/status', function(request, response) {
    log.info({req : request}, {message : 'GET request to /status received'});

    response.status(200).send(
      {'name' : appInfo.name, 'description' : appInfo.description, 'version' : 'v' + appInfo.version, 'status' : 'OK'}
    );

    log.info('GET request to /status successfully processed');
  });

  //
  // api routes
  //

  // get blog route
  router.get('/blog', function(request, response) {
    log.info({req : request}, {message : 'GET request to /blog received'});

    response.status(200).send(
      {'message' : 'GET reuqest to /blog successfully processed'}
    );

    log.info('GET request to /blog successfully processed');
  });
}

module.exports = {
  register : registerRoutes
};
