const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth')

// GET ALL USERS 'user/
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users)
  } catch(err) {
    next(err)
  }
})

// GET SPECIFIC USER user/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user)
  } catch(err) {
    next(err)
  }
})
// POST FOR LOGIN
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email } || { username: req.body.username })
    console.log(user)
    if(user.isAdmin === true){
      const token = await createUserToken(req, user)
      res.status(201).json({ token, user }) 
    } else {
      res.json({ user })
    }
  } catch(err) {
    next(err)
  }
})

// POST NEW USER with hashed pw
router.post('/signup', async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password});
    res.status(201).json(newUser);
  } catch(err) {
    next(err)
  }
})

module.exports = router