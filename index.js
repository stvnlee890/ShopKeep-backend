const express = require('express');
const cors = require('cors');
const app = express();
// INSTANTIATE APP
app.set('port', process.env.PORT || 8080);

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Home page')
});

// CONTROLLERS s

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