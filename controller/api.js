const Theater = require('../model/theater');
const Movie = require('../model/movie');
const Show = require('../model/show');
const Booking = require('../model/booking');


// post a theater
const postTheater = async (req, res) => {

	// get theaterData
	const { body: { theaterName }, body: theaterData } = req

	try {

		// if user has send some data
		if (Object.keys(theaterData).length > 0) {
			const isTheaterExist = await Theater.exists({ theaterName })
			if (isTheaterExist) return res.json({ error: "theater already exist" })
		}
		// what if someone has send a bad request?
		//  like an empty object ?
		else {
			return res.status(400).json({
				error: "please enter correct information"
			})
		}
		
		// send theaterData to database
		const addedTheater = await Theater.create(theaterData).lean();


		// if success full then then success msg
		addedTheater && res.json(addedTheater)


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

		// if user has send some data
		if (Object.keys(movieData).length > 0) {

			const isTheaterExist = await Theater.exists({ theaterName })
			// what if theater don't exist?
			if (!isTheaterExist) {
				const theatersData = await Theater.find()
				const theatersNameList = theatersData.reduce((a, c) => [...a, c.theaterName], [])
				return res.json({
					error: `theater '${theaterName}' don't exist`,
					"available theater names": theatersNameList
				})
			}

			const isShowExist = await Show.exists({ showName })
			// what if show don't exist?
			if (!isShowExist) {
				const showsData = await Show.find()
				const showsNameList = showsData.reduce((a, c) => [...a, c.showName], [])
				return res.json({
					error: `show '${showName}' don't exist`,
					"available show names": showsNameList
				})
			}

			const isMovieExist = await Movie.exists({ movieName })
			// what if movie ALREADY exist?
			if (isMovieExist) return res.json({ error: `movie ${movieName} already exist` })

		}
		// what if someone has send a bad request?
		//  like an empty object ?
		else {
			return res.status(400).json({
				error: "please enter correct information"
			})
		}

		// send movieData to database
		const addedMovie = await Movie.create(movieData).lean();


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
	const { body: { showName }, body: showData } = req

	try {

		// if user has send some data
		if (Object.keys(showData).length > 0) {
			const isShowExist = await Show.exists({ showName })
			if (isShowExist) return res.json({ error: "show already exist" })
		}
		// what if someone has send a bad request?
		//  like an empty object ?
		else {
			return res.status(400).json({
				error: "please enter correct information"
			})
		}


		// send showData to database
		const addedShow = await Show.create(showData).lean();


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
	const { body: { bookingName, theaterName, seatName: seatNames, movieName, showName }, body: bookingData } = req

	const bookedString = `${theaterName}/${seatNames}/${movieName}/${showName}/`;

	try {
		// if already exist -> send error msg

		if (Object.keys(bookingData).length > 0) {

			const isTheaterExist = await Theater.exists({ theaterName })
			// what if theater don't exist?
			if (!isTheaterExist) {
				const theatersData = await Theater.find()
				const theatersNameList = theatersData.reduce((a, c) => [...a, c.theaterName], [])
				return res.json({
					error: `theater '${theaterName}' don't exist`,
					"available theater names": theatersNameList
				})
			}

			// what if seat don't exist?
			else {
				const isSeatExist = await Theater.exists({ theaterName, seatNames })
				if (!isSeatExist) {
					const { seatNames: expectedSeats } = await Theater.findOne({ theaterName })
					console.log({ expectedSeats });

					return res.status(400).json({
						error: `seat name ${seatNames} don't exist`,
						"available seats names": expectedSeats

					})
				}
			}

			const isMovieExist = await Movie.exists({ movieName })
			// what if movie don't exist?
			if (!isMovieExist) {
				const moviesData = await Movie.find()
				const moviesNameList = moviesData.reduce((a, c) => [...a, c.movieName], [])
				return res.json({
					error: `movie '${movieName}' don't exist`,
					"available movie names": moviesNameList
				})
			}

			const isShowExist = await Show.exists({ showName })
			// what if show don't exist?
			if (!isShowExist) {
				const showsData = await Show.find()
				const showsNameList = showsData.reduce((a, c) => [...a, c.showName], [])
				return res.json({
					error: `show '${showName}' don't exist`,
					"available show names": showsNameList
				})
			}

			const isBookingExist = await Booking.exists({ bookedString })
			// what if booking ALREADY exist?
			if (isBookingExist) return res.json({ error: "booking already exist" })

		}
		// what if someone has send a bad request?
		//  like an empty object ?
		else {
			return res.status(400).json({
				error: "please enter correct information"
			})
		}

		// adding bookedString to booking Data
		bookingData.bookedString = bookedString;

		// send bookingData to database
		const addedBooking = await Booking.create(bookingData).lean();


		// if success then then success msg
		res.json(addedBooking)


	} catch (error) {
		// if err send response
		console.log(error.message)
		console.log(error.stack)
		res.status(400).json({ error: error.message })
	}

};


// edit the booking
const editBooking = async (req, res) => {

	// get bookingData
	const { body: { bookingId, theaterName, seatName: seatNames, movieName, showName }, body: bookingData } = req

	const bookedString = `${theaterName}/${seatNames}/${movieName}/${showName}/`;

	try {

		// if already exist -> send error msg
		if (Object.keys(bookingData).length > 0) {

			const isBookingWithSameIdExist = await Booking.exists({ _id: bookingId }).lean()
			// what if bookingId don't exist?
			if (!isBookingWithSameIdExist) return res.status(404).json({ error: `no booking exist by ${bookingId}` })

			const isTheaterExist = await Theater.exists({ theaterName })
			// what if theater don't exist?
			if (!isTheaterExist) {
				const theatersData = await Theater.find()
				const theatersNameList = theatersData.reduce((a, c) => [...a, c.theaterName], [])
				return res.json({
					error: `theater '${theaterName}' don't exist`,
					"available theater names": theatersNameList
				})
			}

			// what if seat don't exist?
			else {
				const isSeatExist = await Theater.exists({ theaterName, seatNames })
				if (!isSeatExist) {
					const { seatNames: expectedSeats } = await Theater.findOne({ theaterName })
					console.log({ expectedSeats });

					return res.status(400).json({
						error: `seat name ${seatNames} don't exist`,
						"available seats names": expectedSeats

					})
				}
			}

			const isMovieExist = await Movie.exists({ movieName })
			// what if movie don't exist?
			if (!isMovieExist) {
				const moviesData = await Movie.find()
				const moviesNameList = moviesData.reduce((a, c) => [...a, c.movieName], [])
				return res.json({
					error: `movie '${movieName}' don't exist`,
					"available movie names": moviesNameList
				})
			}

			const isShowExist = await Show.exists({ showName })
			// what if show don't exist?
			if (!isShowExist) {
				const showsData = await Show.find()
				const showsNameList = showsData.reduce((a, c) => [...a, c.showName], [])
				return res.json({
					error: `show '${showName}' don't exist`,
					"available show names": showsNameList
				})
			}

			const isBookingExist = await Booking.exists({ bookedString })
			// what if booking ALREADY exist?
			if (isBookingExist) return res.json({ error: "same booking already exist, please make changes" })

		}
		// what if someone has send a bad request?
		//  like an empty object ?
		else {
			return res.status(400).json({
				error: "please enter correct information"
			})
		}

		// adding bookedString to booking Data
		bookingData.bookedString = bookedString;
		delete bookingData.bookingId;

		// send bookingData to database
		const updatedBooking = await Booking.findOneAndUpdate({ _id: bookingId }, bookingData, { lean: true });


		// if success then then success msg
		res.json(updatedBooking)


	} catch (error) {
		// if err send response
		console.log(error.message)
		console.log(error.stack)
		res.status(400).json({ error: error.message })
	}

}

module.exports = { postTheater, postMovie, postShow, postBooking, editBooking }