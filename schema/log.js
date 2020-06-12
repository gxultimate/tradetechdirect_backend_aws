const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
	log_ID: {
		type: String
	},
	account_ID: {
		type: String
	},
	distributor_ID: {
		type: String
	},
	log_activity: {
		type: String
	},
	log_Date: {
		type: String
	}
});

module.exports = Log = mongoose.model('logSchema', logSchema);
