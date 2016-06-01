/**
 * Creates the Schema for a new product and 
 * create a mongoose model of the Producr
 * @param mongoose - the mongoose instance passed here to save a require('mongoose')
 */
function getProductModel(mongoose) {
  var Schema  = mongoose.Schema;
  var Product = new Schema({
  	title : {
  		type : String,
  		required : true
  	},
  	description : {
  		type : String,
  		required : true
  	},
  	modified : {
  		type : Date,
  		default : Date.now
  	}
  });
  
  return mongoose.model('Product', Product);
}

module.exports = {
    productModel : getProductModel
}