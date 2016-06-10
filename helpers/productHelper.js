'use strict';

// instantiate helper object
var Helper = {};

/**
 * Internal method to set category id
 *
 * @param  {obj} category - category object
 * @param  {obj} body - request body
 * @return {obj} category - updates category object
 */
Helper.setCategoryValues = function(category, body) {
  //TODO: Implement adding multiplle categories (product can belong to multiple categories)
  category.title = Helper.setPropertyValues(body, 'category', 'title', null);
  category.description = Helper.setPropertyValues(body, 'category', 'description', null);
  category.categoryCode = Helper.setPropertyValues(body, 'category', 'categoryCode', 'NA');
};

/**
 * Internal method to set product values
 *
 * @param  {obj} product - product object
 * @param  {obj} category - category object
 * @param  {obj} body - request body
 * @return {obj} product - updates product object
 */
Helper.setProductValues = function(product, category, body) {
  product.categories = [];
  product.title = Helper.setPropertyValues(body, 'title', null, null);
  product.description = Helper.setPropertyValues(body, 'description', null, null);

  var netValue = +(body.price && body.price.netValue) ? body.price.netValue : 0;
  var vat = +(body.price && body.price.vat) ? body.price.vat : 0;

  product.price = {
    netValue : netValue,
    vat : vat,
    grossValue : netValue + vat,
    currencyCode : (body.price && body.price.currencyCode) ? body.price.currencyCode : 'GBP'
  };

  //TODO: Implement adding multiplle categories (product can belong to multiple categories)
  product.categories.push(category);
};

/**
 * Internal method to set default generic product values
 *
 * @param  {obj} product - product object
 * @param  {obj} category - category object
 * @param  {obj} body - request body
 * @return {obj} product - updates product object with meta data
 */
Helper.setDefaultProductValues = function(product, category, body) {
  // set meta data
  product.meta = {
    created : Date.now(),
    lastModified : Date.now(),
    visible : (body.visible) ? body.visble : true
  };

  // set product id
  product._id = 'PR-' + Math.floor(Math.random() * (1000 - 1)) + 1;
};

Helper.productValuesExist = function(body, searchKeyOne, searchKeyTwo) {
  debugger

  if ((searchKeyOne) && (searchKeyTwo)) {
    return ((searchKeyOne in body) && (searchKeyTwo in body[searchKeyOne]));
  } else {
    return (searchKeyOne in body);
  }
};

Helper.getProductValues = function(body, searchKeyOne, searchKeyTwo) {
  if ((searchKeyOne) && (searchKeyTwo)) {
      return body[searchKeyOne][searchKeyTwo];
  } else {
    return body[searchKeyOne];
  }
};

Helper.setPropertyValues = function(body, searchKeyOne, searchKeyTwo, noValueDescription) {
  debugger

  var text = 'No ' + searchKeyOne + ' ' + ((searchKeyTwo) ? searchKeyTwo : '') + ' available';
  var noValue = (noValueDescription) ? noValueDescription : text;
  debugger
  return Helper.productValuesExist(body, searchKeyOne, searchKeyTwo) ? Helper.getProductValues(body, searchKeyOne, searchKeyTwo) :
      noValue;
};

module.exports = Helper;
