const express = require('express');
const { postTheater, postMovie, postShow, postBooking } = require('../controller/api');
const router = express.Router();



// add theaters ? name of the theater? probably!
// and location too!
router.post('/theaters', postTheater);


// add movie ? name of the movie? for simplicity only name
router.post('/movie', postMovie)

// add show? what is show? I don't know? need more description...
router.post('/show', postShow)


// book tickets
	// list movie by name | filter
	// list theaters by location | filter

router.post('/booking', postBooking)


// rescheduling bookings




module.exports = router;