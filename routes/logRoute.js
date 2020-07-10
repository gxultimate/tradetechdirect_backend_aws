var express = require('express');
var router = express.Router();
var Log = require('../schema/log'),
Function = require('./function'),
func = new Function();

router.post('/log', (req, res) => {
	const request = req.body.data;

	const log = new Log({
		log_ID: request.log_ID,
		account_ID: request.account_ID,
		distributor_ID: request.distributor_ID,
		log_activity: request.log_activity,
		log_Date: request.log_Date
	});
	log
		.save()
		.then((result) => {
			const log = Log.find({ account_ID: id }, (err, docs) => {
				setTimeout(() => {
					res.json(docs);
				}, 1200);
			});
		})
		.catch((err) => {
			res.json({ status: false });
		});
});

router.get('/log/:id', (req, res) => {
	let id = req.params.id;
	const log = Log.find({ distributor_ID: id }, (err, docs) => {
	
			res.json(docs);
		
	
	});
});

router.put('/log/:id', function(req, res) {
	const request = func.removeUndefinedProps(req.body.data);

	let id = req.params.id;
	Log.findByIdAndUpdate({ _id: id }, request, { new: true ,useFindAndModify: false}, (err, place) => {
		if (err) return res.send(err);
		const log = Log.find({}, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

module.exports = router;
