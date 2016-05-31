function init(mongoose) {
  Schema = mongoose.Schema;

  var Product = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    modified: {type: Date, default: Date.now}
  });

  var ProductModel = mongoose.model('Product', Product);
  return ProductModel;
}

module.exports = {
  init: init
};
