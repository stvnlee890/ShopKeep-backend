const express = require('express');
const router = express.Router();
const StoreFront = require('../models/StoreFront');
const { requireToken } = require('../middleware/auth')

// GET 'url/adminName/storeFront
router.get('/', async (req, res, next) => {
  try {
    const store = await StoreFront.find({}).populate('User')
    res.json(store);
  } catch (err) {
    next(err)
  }
})

// GET SPECIFIC {require token on this route for testing purpose}
router.get('/admin/:id', requireToken, async (req, res, next) => {
  try {
    const store = await StoreFront.findById(req.params.id)
    res.json(store)
  } catch (err) {
    next(err)
  }
})

// POST
router.post('/admin', requireToken, async (req, res, next) => {
  try {
    const newStore = await StoreFront.create(req.body)
    res.status(201).json(newStore);
  } catch (err) {
    next(err);
  }
});

// EDIT
router.put('/admin/:id', requireToken, async (req, res, next) => {
  try {
    const editStore = await StoreFront.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
    if(editStore) {
      res.json(editStore)
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    next(err)
  }
})

// DELETE
router.delete('/admin/:id', requireToken, async (req, res, next) => {
  try {
    const deleteStore = await StoreFront.findByIdAndDelete(req.params.id);
    res.json(deleteStore)
  } catch(err) {
    next(err)
  }
})
module.exports = router