const Theater = require('../model/theater');
const Movie = require('../model/movie');
const Show = require('../model/show');
const Booking = require('../model/booking');


// post a theater
const postTheater = async (req, res) => {

	// get theaterData
	const { body: { theaterName }, body: theaterData } = req

	try {
		// if already exist -> send error msg
		
		if (theaterData) {
			const isTheaterExist = await Theater.exists({ theaterName })
			if (isTheaterExist) return res.json({ error: "theater already exist" })
		}
		

		// send theaterData to database
		const addedTheater = await Theater.create(theaterData);


		// if success full then then success msg
		res.json(addedTheater)


	} catch (error) {
		// if err send response
		console.log(error.message)
		console.log(error.stack)
		res.status(400).json({ error: error.message })
	}

}


// post a movie
const postMovie = async (req, res) => {

	// get movieData
	const { body: { movieName, theaterName, showName }, body: movieData } = req

	try {
		// if already exist -> send error msg

		if (movieData) {
			const isShowExist = await Show.exists({ showName })
			if (!isShowExist) return res.json({ error: "show don't exist" })

			const isTheaterExist = await Theater.exists({ theaterName })
			if (!isTheaterExist) return res.json({ error: "theater don't exist" })
			
			const isMovieExist = await Movie.exists({ movieName })
			if (isMovieExist) return res.json({ error: "movie already exist" })

		}


		// send movieData to database
		const addedMovie = await Movie.create(movieData);


		// if success then then success msg
		res.json(addedMovie)


	} catch (error) {
		// if err send response
		console.log(error.message)
		console.log(error.stack)
		res.status(400).json({ error: error.message })
	}

}


// post a show
const postShow = async (req, res) => {

	// get showData
	const { body: { showName },  body: showData} = req

	try {
		if (showData) {
			const isShowExist = await Show.exists({showName})
			if (isShowExist) return res.json({error: "show already exist"})
		}


		// send showData to database
		const addedShow = await Show.create(showData);


		// if success full then then success msg
		res.json(addedShow)


	} catch (error) {
		// if err send response
		console.log(error.message)
		console.log(error.stack)
		res.status(400).json({ error: error.message })
	}

}


// book a booking
const postBooking = async (req, res) => {

	// get bookingData
	const { body: { bookingName, theaterName, movieName, showName }, body: bookingData } = req

	const bookedString = `${theaterName}/${movieName}/${showName}/`;

	try {
		// if already exist -> send error msg

		if (bookingData) {
			
			const isTheaterExist = await Theater.exists({ theaterName })
			if (!isTheaterExist) {
				const theatersData = await Theater.find()
				const theatersNameList = theatersData.reduce((a, c) => [...a, c.theaterName], [])
				return res.json({
					error: `theater '${theaterName}' don't exist`,
					"available theater names": theatersNameList
				})
			}
			
			const isMovieExist = await Movie.exists({ movieName })
			if (!isMovieExist) {
				const moviesData = await Movie.find()
				const moviesNameList = moviesData.reduce((a, c) => [...a, c.movieName], [])
				return res.json({
					error: `movie '${movieName}' don't exist`,
					"available movie names": moviesNameList
				})
			}

			
			const isShowExist = await Show.exists({ showName })
			if (!isShowExist) {
				const showsData = await Show.find()
				const showsNameList = showsData.reduce((a, c) => [...a, c.showName], [])
				return res.json({
					error: `show '${showName}' don't exist`,
					"available show names": showsNameList
				})
			}

			const isBookingExist = await Booking.exists({ bookedString })
			if (isBookingExist) return res.json({ error: "booking already exist" })

		}

		// adding bookedString to booking Data
		bookingData.bookedString = bookedString;

		// send bookingData to database
		const addedBooking = await Booking.create(bookingData);


		// if success then then success msg
		res.json(addedBooking)


	} catch (error) {
		// if err send response
		console.log(error.message)
		console.log(error.stack)
		res.status(400).json({ error: error.message })
	}

};


module.exports = { postTheater, postMovie, postShow, postBooking }