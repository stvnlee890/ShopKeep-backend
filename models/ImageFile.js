const mongoose = require('../db/connection');

const ImageFileSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
},
{
  storeFront: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreFront',
    required: true,
  }
},
{
  timestamps: true,
})

const ImageFile = mongoose.model('ImageFile', ImageFileSchema);
module.exports = ImageFile;