const mongoose = require('../db/connection');
const ImageFile = require('./ImageFile')

const StoreFrontSchema = new mongoose.Schema({
  imageUrl : {
    type: [String],
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
},
{
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
{
  timestamps: true,
})

const StoreFront = mongoose.model('StoreFront', StoreFrontSchema);
module.exports = StoreFront;