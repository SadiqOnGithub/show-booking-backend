const mongoose = require('mongoose');



//  schemas theater
const theaterSchema = new mongoose.Schema({
	theaterName: { type: String, required: true },
	seatNames: {
		type: [{ type: String, required: true }],
		default: undefined,
		required: true
	},
	location: { type: String, required: true }
})

// make model
const Theater = mongoose.model('Theater', theaterSchema);


module.exports = Theater;