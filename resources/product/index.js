'use strict';

var model = require('./model');
var log   = require('../../middleware/logger').child({
      level : 'info',
      component : '[RESOURCES-PRODUCT-INDEX]'
    });

var product = {};

/**
 * root controller method to get products
 * @param req - req object
 * @param res - res object
 * @param next - callback
 */
product.get = function(req, res, next) {
  log.info({message : 'GET request to /product received'});

  // check if product id specified
  if (req.params.id) {
    // get specific product from model
    model.getById(req.params.id, next);
  } else {
    // get all products from model
    model.get(req, next);
  }

};

/**
 * root controller method to create products
 * @param req - req object
 * @param res - res object
 * @param next - callback
 */
product.create = function(req, res, next) {
  log.info({message : 'POST request to /product received'});
  // get all products from model
  model.create(req, req.body, next);
};

/**
 * root controller method to update products
 * @param req - req object
 * @param res - res object
 * @param next - callback
 */
product.update = function(req, res, next) {
  log.info({message : 'PUT request to /product received'});

  // get all products from model
  model.update(req.params.id, req.body, next);
};

/**
 * root controller method to delete products
 * @param req - req object
 * @param res - res object
 * @param next - callback
 */
product.delete = function(req, res, next) {
  log.info({message : 'DELETE request to /product received'});

  // get all products from model
  model.delete(req.params.id, next);
};

module.exports = product;
