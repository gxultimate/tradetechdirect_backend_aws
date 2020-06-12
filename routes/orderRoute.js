var express = require('express'),
	router = express.Router(),
	Order = require('../schema/order'),
	Filter = require('./function');

function removeUndefinedProps(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop) && obj[prop] === '') {
			delete obj[prop];
		}
	}
	return obj;
}

router.post('/order', (req, res) => {
	const request = req.body.data;

	const order = new Order({
		orderID: request.orderID,
		modeOfPayment: request.modeOfPayment,
		orderDate: request.orderDate,
		orderItems: request.orderItems,
		orderStatus: request.orderStatus,
		paymentStatus: request.paymentStatus,
		orderTotalAmount: request.orderTotalAmount,
		account_ID: request.account_ID,
		distributor_ID: request.distributor_ID,
		packer_ID: request.packer_ID,
		order_Quantity: request.order_Quantity,
		dispatcher_ID: request.dispatcher_ID,
		order_addedInfo: request.order_addedInfo,
		order_totalPayment: request.order_totalPayment
	});
	order
		.save()
		.then((result) => {
			setTimeout(() => {
				const order = Order.find({ account_ID: request.account_ID }, (err, docs) => {
					res.json(docs);
				});
			}, 1200);
		})
		.catch((err) => {
			res.json({ status: false });
		});
});

router.get('/order/:id/:packerId', (req, res) => {
	let staffID = req.params.id;
	let id = req.params.packerId;

	Order.find({ packer_ID: staffID, distributor_ID: id }, (err, docs) => {
		if (docs.length !== 0) {
			res.json(docs);
		} else {
			Order.find({ dispatcher_ID: staffID, distributor_ID: id }, (err, doc) => {
				res.json(doc);
			});
		}
	});
});

router.get('/order/:id', (req, res) => {
	let packerId = req.params.id;
	packerId, 'id';
	Order.find({ account_ID: packerId }, (err, docs) => {
		if (docs.length !== 0) {
			res.json(docs);
		} else {
			Order.find({ distributor_ID: packerId }, (err, doc) => {
				if (doc.length !== 0) {
					res.json(doc);
				}
			});
		}
	});
});

router.patch('/order/:id', (req, res) => {
	const request = removeUndefinedProps(req.body.data);

	let id = req.params.id;

	Order.findByIdAndUpdate({ _id: id }, request, { new: true }, (err, place) => {
		if (err) return res.send(err);
		else
			setTimeout(() => {
				Order.find({ _id: id }, (err, docs) => {
					res.json(docs);
				});
			}, 1200);
	});
});

module.exports = router;
