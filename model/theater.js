const mongoose = require('mongoose');


// make both the schemas
const theaterSchema = new mongoose.Schema({
	theaterName: { type: String, required: true },
	location: { type: String, required: true }
})

// make model
const Theater = mongoose.model('Theater', theaterSchema);


module.exports = Theater;