const mongoose = require('mongoose');


// make both the schemas
const seatSchema = new mongoose.Schema({
	seatName: { type: String, required: true },
})

// make model
const Seat = mongoose.model('Seat', seatSchema);


module.exports = Seat;