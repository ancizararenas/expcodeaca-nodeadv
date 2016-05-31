var log = require('../middleware/logger').child({
  level : 'info',
  component : '[LIB-ROUTES]'
});

function register(router, mongoose) {
  var productController  = require('../controllers/productController');
  productController.init(mongoose);

  router.get('/products', function (request, response) {
    log.info("GET request to /products received");
    productController.getProducts(request, response);
  });

  router.get('/products/:id', function(request, response) {
    log.info("GET request to /products/" + request.params.id + " received");
    productController.getProductById(request, response);
  });

  router.post('/products', function(request, response) {
    log.info("POST request to /products received");
    productController.createNewProduct(request, response);
  });

  router.put('/products/:id', function(request, response) {
    log.info("PUT request to /products/" + request.params.id + " received");
    productController.updateProduct(request, response);

  });

  router.delete('/products/:id', function(request, response) {
    log.info("DELETE request to /products/" + request.params.id + " received");
    productController.deleteProduct(request, response);
  });
};

module.exports = {
  register : register
};
