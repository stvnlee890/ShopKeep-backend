const mongoose = require('../db/connection');


const StoreFrontSchema = new mongoose.Schema({
  storeName: String,
  imageUrl : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ImageFile',
  },
  price: {
    type: Number,
    required: true,
  },
  condition: String,
  color: String,
  description: String,
  category: String,
  username: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
})



const StoreFront = mongoose.model('StoreFront', StoreFrontSchema);
module.exports = StoreFront;