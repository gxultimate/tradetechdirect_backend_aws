var express = require('express');
var router = express.Router();
var Cart = require('../schema/cart'),
	Function = require('./function'),
	func = new Function(),
	uuidv4 = require('uuid/v4');

router.post('/cart', (req, res) => {
	const request = req.body.data;

	const cart = Cart.findOne(
		{ product_ID: request.product_ID, account_ID: request.account_ID, distributor_ID: request.distributor_ID },
		(err, docs) => {
			if (err || docs === null) {
				const cart = new Cart({
					cart_ID: uuidv4(),
					account_ID: request.account_ID,
					product_ID: request.product_ID,
					product_Name: request.product_Name,
					product_Category: request.product_Category,
					product_Description: request.product_Description,
					product_Price: request.product_Price,
					product_UoM: request.product_UoM,
					product_Img: request.product_Img,
					product_Barcode: request.product_Barcode,
					product_Brand: request.product_Brand,
					product_DateReceived: request.product_DateReceived,
					product_ExpirationDate: request.product_ExpirationDate,
					product_Remarks: request.product_Remarks,
					product_SubCategory: request.product_SubCategory,
					distributor_ID: request.distributor_ID,
					product_Quantity: request.product_Quantity,
					product_TransactionDate: request.product_TransactionDate,
					product_TotalAmount: request.product_TotalAmount,
					product_Packaging: request.product_Packaging,
					product_Variant: request.product_Variant,
				});
				cart
					.save()
					.then((result) => {
						const cart = Cart.find(
							{ account_ID: request.account_ID, distributor_ID: request.distributor_ID },
							(err, docs) => {
								setTimeout(() => {
									res.json(docs);
								}, 1200);
							}
						);
					})
					.catch((err) => {
						res.json({ status: false });
					});
			} else {
				let newQuantity = parseInt(docs.product_Quantity) + parseInt(request.product_Quantity);
				const cart = Cart.findOneAndUpdate(
					{ account_ID: id },
					{ product_Quantity: newQuantity },
					{ new: true, useFindAndModify: false },
					(err, docs) => {
						const cart = Cart.find(
							{ account_ID: request.account_ID, distributor_ID: request.distributor_ID },
							(err, docs) => {
								setTimeout(() => {
									res.json(docs);
								}, 1200);
							}
						);
					}
				);
			}
		}
	);
});

router.get('/cart/:id', (req, res) => {
	let id = req.params.id;
	if (id !== null || id !== "") {
		const cart = Cart.find({ account_ID: id }, (err, docs) => {
			if (docs.length !== 0) {
				res.json(docs);
			}
			else {
				Cart.find({ distributor_ID: id }, (err, docs) => {
					res.json(docs);
				});
			}

		});
	}
	else {
		res.sendStatus(403).send(false)
	}


});


router.put('/cart/:id/:accountID', function (req, res) {
	const request = func.removeUndefinedProps(req.body.data);
	let id = req.params.id;
	let accountID = req.params.accountID;

	Cart.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
		if (err) return res.send(err);

		const cart = Cart.find({ account_ID: accountID }, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

router.delete('/cart/:id/:accountID', (req, res) => {
	let id = req.params.id;
	let accountID = req.params.accountID;

	Cart.deleteOne({ _id: id }, (err, place) => {
		if (err) return res.send(err);
		const cart = Cart.find({ account_ID: accountID }, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

module.exports = router;
