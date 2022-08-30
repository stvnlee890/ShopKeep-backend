const mongoose = require('../db/connection');

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
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
},
{
  timestamps: true,
})

const ImageFile = mongoose.model('ImageFile', ImageFileSchema);
module.exports = ImageFile;
