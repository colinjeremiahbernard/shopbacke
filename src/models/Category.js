const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.schema({
  name: String,
  slug: String,
  });

const modelName = 'Category';

if (mongoose.connection && mongoose.connection.models[
  modelName] ) {
    module.exports = mongoose.connection.models[modelName];
  } else {
    module.exports = mongoose.model(modelName,
       modelSchema);
  }