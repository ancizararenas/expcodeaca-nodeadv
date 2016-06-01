'use strict';

var appInfo   = require('../package.json');
var products  = require('../resources/products');
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
    log.info({req : request}, {message : 'GET request to /status received'});

    response.status(response.statusCode).json(
      {'name' : appInfo.name, 'description' : appInfo.description, 'version' : 'v' + appInfo.version, 'status' : 'OK'}
    );

    log.info('GET request to /status successfully processed');
  })

  //
  // api routes
  //

  .get('/products', function(request, response) {
	log.info({req : request}, {message : 'GET request to /products received'})

	ProductModel.find(function(err, products) {
	  if(err) {
	  	log.error({req : request}, {err : err});
  		return response.json({statusCode : err.statusCode || 500, message : 'Internal Server Error'});
	  }

	  return response.status(200).json(products);
	});

	log.info('GET request to /products successfully processed');
  })

  .get('/products/:id', function(request, response) {
	log.info({req : request}, {message : 'GET request to /products received with param id of ' + request.params.id });

  	ProductModel.findById(request.params.id, function(err, product) {
  	  if(err) {
   		log.error({req : request}, {err : err});
  		return response.json({statusCode : err.statusCode || 404, message : 'Item not found!'});
  	  }

  	  return response.status(200).json(product);
  	});

	log.info('GET request to /products with id ' + request.params.id + ' successfully processed');
  })

  .post('/products', function(request, response) {
	log.info({req : request}, {message : 'POST request to /products received' });

  	ProductModel({
  	  title : request.body.title,
      description : request.body.description
  	}).save(function(err, product) {
  	  if(err) {
  		log.error({req : request}, {err : err});
  		return response.json({statusCode : err.statusCode || 500, message : 'Internal Server Error'});
  	  }

  	  return response.status(200).json(product);
  	});

	log.info('POST request to /products successfully processed');
  })

  .put('/products/:id', function(request, response) {
	log.info({req : request}, {message : 'PUT request to /products received with param id of ' + request.params.id });

	ProductModel.findByIdAndUpdate(request.params.id, {description : 'My test Product\'s new description'}, function(err, product) {
	  if(err) {
	  	log.error({req : request}, {err : err});
	  	return response.json({statusCode : err.statusCode || 404, message : 'Item not found!'});
	  }

	  return response.status(200).json(product);
	});

	log.info('PUT request to /products with id ' + request.params.id + ' successfully processed');
  })

  .delete('/products/:id', function(request, response) {
	log.info({req : request}, {message : 'DELETE request to /products received with param id of ' + request.params.id });

	ProductModel.findByIdAndRemove(request.params.id, function(err, product) {
	  if(err) {
  		log.error({req : request}, {err : err});
  		return response.json({statusCode : err.statusCode || 404, message : 'Item not found!'});
  	  }

   	  return response.status(200).json(product);
	});

	log.info('DELETE request to /products with id ' + request.params.id + ' successfully processed');
  });

  var ProductModel = products.productModel(mongoose);
}

module.exports = {
  register : registerRoutes
};
