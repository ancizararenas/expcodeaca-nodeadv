'use strict';

var appInfo   = require('../package.json');
var resources = require('../resources');
var respond   = require('../middleware/respond');
var log       = require('../middleware/logger').child({
      level : 'info',
      component : '[LIB-ROUTES]'
    });

/**
 * function to register the REST API routes
 * @param router - express.Router object
 */
function registerRoutes(router, mongoose) {
  log.info('registering routes');

  // test status endpoint to verify api router working
  router.get('/status', function(request, response) {
    log.info({message : 'GET request to /status received'});

    response.status(200).send(
      {'name' : appInfo.name, 'description' : appInfo.description, 'version' : 'v' + appInfo.version, 'status' : 'OK'}
    );

    log.info('GET request to /status successfully processed');
  });

  //
  //  PRODUCT API ROUTES
  //

  // get all products v1
  router.get('/product',
    resources.product.get,
    respond);

  // get product by id
  router.get('/product/:id',
    resources.product.get,
    respond);

  // create product
  router.post('/product',
    resources.product.create,
    respond);

  // update product
  router.put('/product/:id',
    resources.product.update,
    respond);

  // delete product
  router.delete('/product:id',
    resources.product.delete,
    respond);
};

module.exports = {
  register : registerRoutes
};
