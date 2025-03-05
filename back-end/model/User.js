const mongoose = require('mongoose');

const User = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: { 
		type: String,
		required: true,
		unique: true 
	},
	password: {
		type: String,
		required: true
	},
	role: { 
		type: String, 
		enum: ['client', 'admin'], 
		default: 'client' 
	}
  });

  module.exports = mongoose.model('User'  , User);