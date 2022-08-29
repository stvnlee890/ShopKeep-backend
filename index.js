const express = require('express');
const app = express();
const cors = require('cors');
// INSTANTIATE APP
app.set('port', process.env.PORT || 8080);

// MIDDLEWARE
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Home page')
});

// CONTROLLERS

const storeFrontController = require('./controllers/StoreFrontController');
app.use('/store-front', storeFrontController)

const ImageFileController = require('./controllers/ImageFileController');
app.use('/images', ImageFileController)

const UserController = require('./controllers/UserController');
app.use('/user', UserController)

const FavoriteController = require('./controllers/FavoriteController');
app.use('/favorite', FavoriteController)

// SERVER
app.listen(app.get('port'), () => {
  console.log(`|| PORT: ${app.get('port')} ||`);
});