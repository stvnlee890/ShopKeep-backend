const express = require('express');
const router = express.Router();
const StoreFront = require('../models/StoreFront');
const { requireToken } = require('../middleware/auth')

// GET 'url/adminName/storeFront
router.get('/', async (req, res, next) => {
  try {
    const store = await StoreFront.find({})
    res.json(store);
  } catch (err) {
    next(err)
  }
})

// GET STORES ASSOCIATED WITH PARTICULAR USER
router.get('/:id', async (req, res, next) => {
  try {
    const store = await StoreFront.find({username: req.params.id})
    for (const id of store) {
      console.log(id._id)
    }
    res.status(200).json(store)
  } catch {
    next(err)
  }
})

// GET SPECIFIC {require token on this route for testing purpose}
router.get('/admin/:id', async (req, res, next) => {
  try {
    const store = await StoreFront.findById(req.params.id).populate('owner')
    res.status(200).json(store)
  } catch (err) {
    next(err)
  }
})



// POST
router.post('/admin', requireToken, async (req, res, next) => {
  try {
    const newStore = await StoreFront.create(req.body)
    const populate = await newStore.populate('owner')
    res.status(201).json(newStore);
  } catch (err) {
    next(err);
  }
});

// EDIT
// FOR NOW DON'T REQUIRE TOKEN
router.put('/admin/:id', async (req, res, next) => {
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