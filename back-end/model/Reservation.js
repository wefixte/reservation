const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
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
		type: String, 
		required: true 
	},
    timeSlot: { 
		type: String, 
		required: true 
	},
    guests: { 
		type: Number, 
		required: true, 
		min: 1 
	},
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);