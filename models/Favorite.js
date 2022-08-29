const mongoose = require('../db/connection');

// const ImageFileSchema = new mongoose.Schema({
//   imageName: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   imageUrl: String,
// },
// {
//   storeFront: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'StoreFront',
//     required: true,
//   }
// },
// {
//   timestamps: true,
// })

const FavoriteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  storeFront: String,
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
