require('dotenv').config()
const express = require('express');
const router = express.Router();
const ImageFile = require('../models/ImageFile');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// GET

// RANDOMIZE NAMES TO UPLOAD AS UNIQUE KEYS IN AWS
const randomName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex')

// DOTENV VARIABLES FOR AWS CREDENTIALS
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

// PARAMS WITH CREDENTIALS TO SEND TO AWS
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  },
  region: region
})

// MEMORY STORAGE FOR MULTER TO SEND STRAIGHT TO AWS INSTEAD OF FILE PATH
const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

// GET IMAGES WITH PRESIGNED URL
router.get('/:storeid', async (req, res) => {
  const posts = await ImageFile.find({storeFront: req.params.storeid})

  for (const post of posts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: post.imageKey
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.imageUrl = url
  }
  res.send(posts)
})

// POST TO AWS AND TO MONGODB
router.post('/', upload.single('image'), async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  

  const randomImageKey = randomName()

  const params = {
    Bucket: bucketName,
    Key: randomImageKey,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }

  const command = new PutObjectCommand(params)
  await s3.send(command)

  const postImage = await ImageFile.create({...req.body, imageKey: randomImageKey })
  const populate = await postImage.populate('storeFront')
   res.sendStatus(201)
})



//============= TEST ROUTE CODE ==============///
// router.get('/', async (req, res, next) => {
//   try {
//     const images = await ImageFile.find({}).populate('storeFront')
//     res.status(200).json(images)
//   } catch (err) {
//     next(err)
//   }
// })

// // GET BY ID
// router.get('/:id', async (req, res, next) => {
//   try {
//     const images = await ImageFile.findById(req.params.id).populate('storeFront')
//     res.status(200).json(images)
//   } catch (err) {
//     next(err)
//   }
// })

// // POST
// router.post('/', async (req, res, next) => {
//   try {
//     const newImage = await (await ImageFile.create(req.body));
//     res.status(201).json(newImage)
//   } catch (err) {
//     next(err)
//   }
// })

// // PUT
// router.put('/:id', async (req, res, next) => {
//   try {
//     const editImage = await ImageFile.findByIdAndUpdate({ _id: req.params.id }, req.body, {
//       new: true,
//     })
//     if(editImage) {
//       res.json(editImage)
//     } else {
//       res.sendStatus(404)
//     }
//   } catch(err) {
//     next(err)
//   }
// })

// // DELETE
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deleteImage = await ImageFile.findByIdAndDelete(req.params.id)
//     res.status(204).json(deleteImage)
//   } catch(err) {
//     next(err)
//   }
// })

module.exports = router