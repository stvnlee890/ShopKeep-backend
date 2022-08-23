const express = require('express');
const router = express.Router();
const User = require('../models/User')

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

// POST USER
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch(err) {
    next(err)
  }
})

module.exports = router