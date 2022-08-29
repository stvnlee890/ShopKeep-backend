const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');



// CREATE NEW FAVORITE
router.post('/', async(req, res, next) => {
  try {
    const newFavorite = await Favorite.create(req.body)
    res.status(201).json(newFavorite)
  } catch (err) {
    next(err);
  }
});

// DELETE FAVORITE  
router.delete('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const deleteFavorite = await Favorite.findByIdAndDelete(req.params.id)
    res.json(deleteFavorite)
  } catch(err) {
    next(err)
  }
})
module.exports = router