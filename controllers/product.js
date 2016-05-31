'use strict';

const Product = require('../models/product');

module.exports = {
  getAll: () => {
    return Product.find({});
  },
  getOne: (query) => {
    return Product.findOne(query);
  },
  create: (data) => {
    const product = new Product(data);

    return product.save();
  },
  update: (query, data) => {
    return Product.findOneAndUpdate(query, data);
  },
  remove: (query) => {
    return Product.findOneAndRemove(query);
  }
};
