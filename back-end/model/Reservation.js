const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: { 
		type: String,
		required: true,
		trim: true
	},
	date: {
		type: Date,
		required: true
	},
	guests: {
		type: Number,
		required: true,
		min: 1,
	},
  }, {timestamps: true});

    module.exports = mongoose.model('Reservation'  , Reservation);