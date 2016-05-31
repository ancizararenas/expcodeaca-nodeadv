var log = require('../middleware/logger').child({
  level : 'info',
  component : '[CONTROLLER-PRODUCT_CONTROLLER]'
});

var ProductModel;

function createNewProduct(request, response) {
  var product = new ProductModel({
    title: request.body.title,
    description: request.body.description
  });

  product.save(function(err) {
    if (err) {
      log.error({req: request}, {err: err});
      return response.status(500).json({statusCode: err.statusCode || 500, message: err.message});
    }
    log.info({req: request}, {message: "product successfully saved"});
    return response.status(200).json(product);
  });
}

function getProductById(request, response) {
  ProductModel.findById(request.params.id,
    function(err, data) {
      if (err) {
        log.error({req: request}, {err: err});
        return response.status(500).json({statusCode: err.statusCode || 500, message: err.message});
      }
      log.info({req: request}, {message: "product successfully found"});
      return response.status(200).json(data);
  });
}

function getProducts(request, response) {
  ProductModel.find({},
    function(err, data) {
      if (err) {
        log.error({req: request}, {err: err});
        return response.status(500).json({statusCode: err.statusCode || 500, message: err.message});
      }
      log.info({req: request}, {message: "products successfully returned"});
      return response.status(200).json(data);
  });
}

function updateProduct(request, response) {
  ProductModel.findByIdAndUpdate(request.params.id,
    {
      title: request.body.title,
      description: request.body.description
    },
    function(err, data) {
      if (err) {
        log.error({req: request}, {err: err});
        return response.status(500).json({statusCode: err.statusCode || 500, message: err.message});
      }
      log.info({req: request}, {message: "product successfully updated"});
      return response.status(200).json(data);
  });
}

function deleteProduct(request, response) {
  ProductModel.findByIdAndRemove(request.params.id,
    function(err, data) {
      if (err) {
        log.error({req: request}, {err: err});
        return response.status(500).json({statusCode: err.statusCode || 500, message: err.message});
      }
      log.info({req: request}, {message: "product successfully deleted"});
      return response.status(200).json(data);
  });
}

function init(mongoose) {
  var productModel  = require('../models/product');
  ProductModel = productModel.init(mongoose);
}

module.exports = {
  init: init,
  createNewProduct: createNewProduct,
  getProductById: getProductById,
  getProducts: getProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
};
