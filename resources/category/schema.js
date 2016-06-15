'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// object to store all schemas
var Schemas = {};

// instantiate content schema
var CategoriesSchema = new Schema({});

CategoriesSchema.add({
  title : {type : String, required: true},
  description : {type : String, required: true},
  _id : {type : String, required: true,
    unique : true, index : true, uppercase : true}
});

// set schemas into Schemas object
Schemas.categoriesSchema = mongoose.model('Categories', CategoriesSchema);

module.exports = Schemas;
