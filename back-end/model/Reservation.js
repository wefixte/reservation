const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: { 
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	guests: {
		type: Number,
		required: true
	},
  }, {timestamps: true});

    module.exports = mongoose.model('Reservation'  , Reservation);