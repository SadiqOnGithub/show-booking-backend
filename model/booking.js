const mongoose = require('mongoose');


// make both the schemas
const bookingSchema = new mongoose.Schema({
	bookingName: { type: String, required: true },
	bookedString: { type: String, required: true },
	theaterName: { type: String, required: true },
	movieName: { type: String, required: true },
	showName: { type: String, required: true }
})

// make model
const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;