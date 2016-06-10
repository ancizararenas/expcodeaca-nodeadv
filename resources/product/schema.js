'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// object to store all schemas
var Schemas = {};

// instantiate content schema
var CategoriesSchema = new Schema({});
var ProductsSchema = new Schema({});

CategoriesSchema.add({
  _id : false,
  title : {type : String, required: true},
  description : {type : String, required: true},
  categoryCode : {type :String, required: true}
});

ProductsSchema.add({
  title : {type : String, required: true},
  _id : {type : String, required: true, unique : true, index : true, uppercase : true},
  description : {type : String, required : true},
  price : {
    grossValue : {type : Number, required : true},
    netValue : {type : Number, required : true},
    vat : {type : Number, required : true, default : 0},
    currencyCode : {type : String, required : true, default : 'GBP'}
  },
  categories : [CategoriesSchema],
  meta : {
    created : {type : Date, required : true},
    lastModified : {type : Date, default : Date.now},
    visible : {type : Boolean, required : true, default : true}
  }
});

// set schemas into Schemas object
Schemas.categoriesSchema = mongoose.model('Categories', CategoriesSchema);
Schemas.productsSchema = mongoose.model('Products', ProductsSchema);

module.exports = Schemas;
