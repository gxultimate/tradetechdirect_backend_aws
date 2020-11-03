var express = require('express');
var router = express.Router();
var PriceHist = require('../schema/priceHistory'),
Function = require('./function'),
func = new Function();

router.post('/pricehistory', (req, res) => {
	const request = req.body.data;
	const pricehist = new PriceHist({
		priceHistID: request.priceHistID,
		product_ID: request.product_ID,
		priceFrom: request.priceFrom,
		priceTo: request.priceTo,
		dateCreated: request.dateCreated,

	});
	pricehist	
		.save()
		.then((result) => {
			const pricehist = PriceHist.find({}, (err, docs) => {
				setTimeout(() => {
					res.json(docs);
				}, 1200);
			});
		})
		.catch((err) => {
			res.json({ status: false });
		});
});

router.get('/getpricehistory', (req, res) => {
	const pricehist = PriceHist.find({}, (err, docs) => {
		res.json(docs);
	});
});



router.put('/pricehistory/:id', (req, res) => {
	const request = func.removeUndefinedProps(req.body.data);
	let id = req.params.id;

	let pricehist = PriceHist.findByIdAndUpdate( id , request, (err, place) => {
    if (err) return res.send(err);
    console.log(err, place)
		const pricehist = PriceHist.find({}, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

module.exports = router;
