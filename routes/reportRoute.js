let express = require('express'),
	router = express.Router(),
	Report = require('../schema/report'),
	uuidv4 = require('uuid/v4'),
	Function = require('./function'),
	func = new Function(),
	moment = require('moment');

router.post('/report', (req, res) => {
	const request = req.body.data;
	const report = new Report({
		report_ID: uuidv4(),
		order_ID: request.order_ID,
		report_Detail: request.report_Detail,
		distributor_ID:request.distributor_ID,
		account_ID:request.account_ID,
		report_Note: request.report_Note,
		report_Date: moment().format('LL'),
		report_Status: request.report_Status,
		report_Type: request.report_Type,

	});
	report
		.save()
		.then((result) => {
			const report = Report.find({distributor_ID:request.distributor_ID}, (err, docs) => {
				setTimeout(() => {
					res.json(docs);
				}, 1200);
			});
		})
		.catch((err) => {
			res.json({ status: false });
		});
});
router.get('/report', async (req, res) => {
	await Report.find({ }, (err, docs) => {
		if (docs.length !== 0) {
			res.json(docs);
		} 
		
	});
});

router.get('/report/:id', async (req, res) => {
	const id = req.params.id;
	await Report.find({ report_ID: id }, (err, docs) => {
		if (docs.length !== 0) {
			res.json(docs);
		} else {
			Report.find({ order_ID: id }, (err, doc) => {
				if (doc.length !== 0) {
					res.json(doc);
				} else {
					Report.find({ distributor_ID: id }, (err, docs2) => {
						res.json(docs2);
					});
				}
			});
		}
	});
});



router.put('/report/:id', function (req, res) {
	const request = func.removeUndefinedProps(req.body.data);
	let id = req.params.id;
	Report.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
		if (err) return res.send(err);
		const report = Report.find({}, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

module.exports = router;
