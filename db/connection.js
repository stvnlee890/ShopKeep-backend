require('dotenv').config();
const mongoose = require('mongoose');

// MONGO CONNECTION
const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

// CONNECTING TO MONGOOSE
mongoose.connect(mongoURI);

db.on('error', (err) => console.log(`⛔${err.message} +  mongodb not connected`));
db.on('connected', () => console.log('✅ mongodb connect at: ', mongoURI));
db.on('disconnected', () => console.log('mongodb disconnected'));

// OPEN CONNECTION
db.on('open', () => {
  console.log('✅ mongo connection made!')
})

module.exports = mongoose