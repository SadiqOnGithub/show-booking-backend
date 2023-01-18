require('dotenv').config()
const mongoose = require('mongoose');


const mySecret = process.env['MONGO_DB_URI'] || 'mongodb://127.0.0.1:27017/showBooking';
mongoose.connect(mySecret);
const db = mongoose.connection;
db.on('error', (err) => console.log("mongoose connection error", err));
db.once('open', () => console.log('Connected to MongoDB!'));