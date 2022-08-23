const mongoose = require('../db/connection');

const ImageFileSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
})

const ImageFile = mongoose.model('ImageFile', ImageFileSchema);
module.exports = ImageFile;