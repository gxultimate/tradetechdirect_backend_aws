const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
	report_ID: {
		type: String
	},
	order_ID: {
		type: String
	},
	report_Detail: {
		type: String
	},
	report_Note: {
		type: String
	},
	report_Date: {
		type: String
	},
	report_Status: {
		type: String
	},
	report_Type: {
		type: String
	},
    distributor_ID : {
        type : String
	},
	account_ID: {
        type : String
	},
});

module.exports = Report = mongoose.model('reportSchema', reportSchema);
