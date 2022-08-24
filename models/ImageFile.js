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

const ImageFileSchema = new mongoose.Schema({
  imageKey: {
    type: String,
    required: true,
  },
  imageUrl: String,
  storeFront: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreFront',
},
},
{
  timestamps: true,
})

const ImageFile = mongoose.model('ImageFile', ImageFileSchema);
module.exports = ImageFile;
