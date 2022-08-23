const express = require('express');
const cors = require('cors');


// INSTANTIATE APP
const app = express();
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


// SERVER
app.listen(app.get('port'), () => {
  console.log(`|| PORT: ${app.get('port')} ||`);
});