const mongoose = require('../db/connection');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profileImage: String,
  isAdmin: Boolean,
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    }
  }
}
)

const User = mongoose.model('User', UserSchema);
module.exports = User