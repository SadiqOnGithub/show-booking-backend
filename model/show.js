const mongoose = require('mongoose');


// make both the schemas
const showSchema = new mongoose.Schema({
	showName: { type: String, required: true }
})

// make model
const Show = mongoose.model('Show', showSchema);


module.exports = Show;