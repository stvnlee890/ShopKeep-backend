const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');



// CREATE NEW FAVORITE
router.post('/', async(req, res, next) => {
  try {
    const newFavorite = await Favorite.create(req.body)
    const populate = await newFavorite.populate('storeFront')
    res.status(201).json(newFavorite)
  } catch (err) {
    next(err);
  }
});

module.exports = router