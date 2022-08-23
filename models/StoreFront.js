const mongoose = require('../db/connection');
const ImageFile = require('./ImageFile')

const StoreFrontSchema = new mongoose.Schema({
  image : {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: String,
  color: String,
  description: String,
  category: String,
})

const StoreFront = mongoose.model('StoreFront', StoreFrontSchema);
module.exports = StoreFront;