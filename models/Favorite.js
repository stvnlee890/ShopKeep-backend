const mongoose = require('../db/connection');


const FavoriteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  imageKey: String,
  imageUrl: String,
  storeFront: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreFront',
},
},
{
  timestamps: true,
})

const Favorite = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorite;
