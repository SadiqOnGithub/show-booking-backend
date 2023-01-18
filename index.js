require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

// custom module
const { errorHandler } = require('./middleware/errorHandler');

// configs
// connect to database
require('./config/databaseConfig.js');
const app = express();



// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))


// routes
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.use('/api', require('./router/api'))


// err
app.use(errorHandler);


const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port)
})
