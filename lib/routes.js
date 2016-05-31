'use strict';

var appInfo   = require('../package.json');
var log       = require('../middleware/logger').child({
      level : 'info',
      component : '[LIB-ROUTES]'
    });

const productController = require('../controllers/product');

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
  .all((req, res, next) => {
    log.info({req}, {message: `${req.method} request to /products received`});
    next();
  })
  .get((req, res) => {
    productController
      .getAll()
      .then((products) => {
        log.info(`${req.method} request to /products successfully processed`);
        res.json(products);
      }, (err) => {
        log.error({err});
        res.status(500).json({status: res.statusCode, messge: err.message});
      });
  })
  .post((req, res) => {
    productController
      .create(req.body)
      .then((product) => {
        log.info(`${req.method} request to /products successfully processed`);
        res.json(product);
      }, (err) => {
        log.error({err});
        res.status(500).json({status: res.statusCode, messge: err.message});
      });
  });

  router
  .param('product_title', (req, res, next, title) => {
    req.productTitle = title;
    next();
  })
  .route('/products/:product_title')
  .all((req, res, next) => {
    log.info({req}, {message: `${req.method} request to /products/${req.productTitle} received`});
    next();
  })
  .get((req, res) => {
    productController
        .getOne({title: req.productTitle})
        .then((product) => {
          log.info(`${req.method} request to /products/${req.productTitle} successfully processed`);
          res.json(product);
        }, (err) => {
          log.error({err});
          res.status(500).json({status: res.statusCode, messge: err.message});
        });
  })
  .put((req, res) => {
    productController
      .update({title: req.productTitle}, req.body)
      .then((product) => {
        log.info(`${req.method} request to /products/${req.productTitle} successfully processed`);
        res.json(product);
      }, (err) => {
        log.error({err});
        res.status(500).json({status: res.statusCode, messge: err.message});
      });
  })
  .delete((req, res) => {
    productController
      .remove({title: req.productTitle})
      .then((product) => {
        log.info(`${req.method} request to /products/${req.productTitle} successfully processed`);
        res.json(product);
      }, (err) => {
        log.error({err});
        res.status(500).json({status: res.statusCode, messge: err.message});
      });
  });
}

module.exports = {
  register : registerRoutes
};
