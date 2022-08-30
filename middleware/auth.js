const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config()

const secret = process.env.JWT_SECRET

const { Strategy, ExtractJwt } = require('passport-jwt');

// EXTRACT JWT FROM BEARER HEADER, when user sends header for login.
const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
}

const strategy = new Strategy(params, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id)
    done(null, user)
  } catch(err) {
    done(err);
  }
});

passport.use(strategy);
passport.initialize();

const requireToken = passport.authenticate('jwt', { session: false });

const createUserToken = (req, user) => {
  if(
    !user ||
    !req.body.password ||
    !bcrypt.compareSync(req.body.password, user.password)
  ) {
    const err = new Error('The provided username or password is incorrect');
    err.statusCode = 422;
    throw err;
  }
  return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

module.exports = {
  requireToken,
  createUserToken,
}