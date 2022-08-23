const express = require('express');
const router = express.Router();
const StoreFront = require('../models/StoreFront');

// GET 'url/adminName/storeFront
router.get('/', async (req, res, next) => {
  try {
    const store = await StoreFront.find({})
    res.json(store);
  } catch (err) {
    next(err)
  }
})

// GET SPECIFIC 

// POST
router.post('/admin', async (req, res, next) => {
  try {
    const newStore = await StoreFront.create(req.body)
    res.status(201).json(newStore);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/admin/:id', async (req, res, next) => {
  try {
    const deleteStore = await StoreFront.findByIdAndDelete(req.params.id);
    res.json(deleteStore)
  } catch(err) {
    next(err)
  }
})
module.exports = router