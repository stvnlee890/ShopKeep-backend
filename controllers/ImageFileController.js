const express = require('express');
const router = express.Router();
const ImageFile = require('../models/ImageFile');

// GET

router.get('/', async (req, res, next) => {
  try {
    const images = await ImageFile.find({}).populate('storeFront')
    res.status(200).json(images)
  } catch (err) {
    next(err)
  }
})

// GET BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const images = await ImageFile.findById(req.params.id).populate('images')
    res.status(200).json(images)
  } catch (err) {
    next(err)
  }
})

// POST
router.post('/', async (req, res, next) => {
  try {
    const newImage = await (await ImageFile.create(req.body));
    res.status(201).json(newImage)
  } catch (err) {
    next(err)
  }
})

// PUT
router.put('/:id', async (req, res, next) => {
  try {
    const editImage = await ImageFile.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
    if(editImage) {
      res.json(editImage)
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    next(err)
  }
})

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteImage = await ImageFile.findByIdAndDelete(req.params.id)
    res.status(204).json(deleteImage)
  } catch(err) {
    next(err)
  }
})

module.exports = router