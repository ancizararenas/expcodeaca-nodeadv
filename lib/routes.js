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
      {'message' : 'GET request to /blog successfully processed'}
    );

    log.info('GET request to /blog successfully processed');
  });

  router
  .route('/products')
  .all(function(request, response, next) {
    log.info({req : request}, {message : request.method + ' request to /products received'});
    next();
  })
  .get(function(request, response) {
      response.json({
          message: 'GET request to /products successfully processed'
      });

      log.info('GET request to /products successfully processed');
  })
  .post(function(request, response) {
      response.json({
          message: 'POST request to /products successfully processed'
      });

      log.info('POST request to /products successfully processed');
  });

  router
  .param('product_id', function(request, response, next, id) {
    request.productId = id;
    next();
  })
  .route('/products/:product_id')
  .all(function(request, response, next) {
    log.info({req : request}, {message : request.method + ' request to /products/' + request.productId + ' received'});
    next();
  })
  .get(function(request, response) {
    response.json({
        message: 'GET request to /products/' + request.productId + ' successfully processed'
    });

    log.info(request.method + ' request to /products/' + request.productId + ' successfully processed');
  })
  .put(function(request, response) {
    response.json({
        message: 'PUT request to /products/' + request.productId + ' successfully processed'
    });

    log.info(request.method + ' request to /products/' + request.productId + ' successfully processed');
  })
  .delete(function(request, response) {
    response.json({
        message: 'DELETE request to /products/' + request.productId + ' successfully processed'
    });

    log.info(request.method + ' request to /products/' + request.productId + ' successfully processed');
  });
}

module.exports = {
  register : registerRoutes
};
