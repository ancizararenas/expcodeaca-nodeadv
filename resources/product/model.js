'use strict';

var Schemas  = require('./schema');
var Model    = require('./schema').productsSchema;
var Helper   = require('../../helpers/productHelper');
var log      = require('../../middleware/logger').child({
      level : 'info',
      component : '[RESOURCES-PRODUCT-MODEL]'
    });

var Product = function() {};

/**
 * Model method to retrieve ALL products
 * @param req - req object
 * @param done - callback
 */
Product.prototype.get = function(req, done) {
  log.info({message : 'about to get ALL products from model'});

  Model.find(function(err, products) {
    if (err || products.length < 1) {
      var error = new Error('No products found');
      error.statusCode = 404;
      log.error(
        {message : 'error encountered retrieving products from model'},
          {error : err || error});
      return done(err || error);
    }
    log.info({req : req},
      {message : 'successfully retrieved products from model'});
    done(null, products);
  });
};

/**
 * Model method to retrieve product with specific id
 * @param id - id of product to search for
 * @param done - callback
 */
Product.prototype.getById = function(id, done) {
  log.info({productId : id},
    {message : 'about to get single product from model'});
    debugger
  Model.findOne({_id : 'PR-' + id}, function(err, product) {
    debugger
    if (err || !(product)) {
      var error = new Error('No product found with id:' + id);
      error.statusCode = 404;
      log.error(
        {message : 'error encountered retrieving product with id: ' + id + ' from model'},
          {error : err || error});
      return done(err || error);
    }
    log.info(
      {message : 'successfully retrieved product with id: ' + id + ' from model'});
    done(null, product);
    });
};

/**
 * Model method to create product
 * @param id - id of product to search for
 * @param done - callback
 */
Product.prototype.create = function(req, body, done) {
  log.info({product : body},
    {message : 'about to create a new product object'});

    // this creates new product object of type ProductSchema
    var product = new Schemas.productsSchema();
    var category = new Schemas.categoriesSchema();
    debugger
    Helper.setCategoryValues(category, body);
    debugger
    Helper.setProductValues(product, category, body);
    debugger
    Helper.setDefaultProductValues(product, category, body);

    product.save(function(err, storedProduct) {
      debugger
      if (err || storedProduct._doc === 'undefined') {
        var error = new Error('Error encounterd storing product');
        error.statusCode = 500;
        log.error({body : body},
          {message : 'error encountered storing product'},
            {error : err || error});
        return done(err || error);
      }

      log.info({product : storedProduct},
        {message : 'successfully created product'});

      storedProduct.statusCode = 201;
      done(null, storedProduct);
    });
};

module.exports = new Product();
