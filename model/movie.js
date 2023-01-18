const mongoose = require('mongoose');


// make both the schemas
const movieSchema = new mongoose.Schema({
	movieName: { type: String, required: true },
	theaterName: { type: String, required: true },
	showName: { type: String, required: true }
})

// make model
const Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;