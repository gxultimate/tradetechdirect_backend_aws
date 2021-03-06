const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	orderID: {
		type: String
	},
	modeOfPayment: {
		type: String
	},
	orderDate: {
		type: String
	},
	orderItems: {
		type: Array
	},
	orderPrice: {
		type: Array
	},
	orderTotalPrice: {
		type: Array
	},
	orderStatus: {
		type: String
	},
	paymentStatus: {
		type: String
	},
	account_ID: {
		type: String
	},
	distributor_ID: {
		type: String
	},
	orderTotalAmount: {
		type: String
	},
	packer_ID: {
		type: String
	},
	dispatcher_ID: {
		type: String
	},
	order_Quantity: {
		type: Array
	},
	order_addedInfo: {
		type: String
	},
	order_totalPayment: {
		type: String
	},
	orderReturnDate: {
		type: String
	},
	orderDateCompleted: {
		type: String
	},
	orderCustomerBalance : {
		type: String
	},
	orderDueDate : {
		type: String
	}
	,
	order_shippingAddress: {
		type: String
	},
	order_storeName: {
		type: String
	}
});

module.exports = Order = mongoose.model('orderSchema', orderSchema);
