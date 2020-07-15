var express = require('express');
var router = express.Router();
var Distributor = require('../schema/distributor'),
Function = require('./function'),
func = new Function();

router.post('/distributors', (req, res) => {
	const request = req.body.data;
	const distributor = new Distributor({
		distributor_ID: request.distributor_ID,
		distributor_username: request.distributor_username,
		distributor_password: request.distributor_password,
		distributor_warehouseName: request.distributor_warehouseName,
		distributor_address: request.distributor_address,
		distributor_emailAddress: request.distributor_emailAddress,
		distributor_contactNo: request.distributor_contactNo,
		distributor_status: request.distributor_status,
		distributor_dateRegistered: request.distributor_dateRegistered,
		distributor_tierNo: request.distributor_tierNo,
		distributor_accessType: request.distributor_accessType,
		distributor_fName: request.distributor_fName,
		distributor_lName: request.distributor_lName,
		distributor_mName: request.distributor_mName
	});
	distributor	
		.save()
		.then((result) => {
			const distributor = Distributor.find({}, (err, docs) => {
				setTimeout(() => {
					res.json(docs);
				}, 1200);
			});
		})
		.catch((err) => {
			res.json({ status: false });
		});
});

router.get('/distributors', (req, res) => {
	const distributor = Distributor.find({}, (err, docs) => {
		res.json(docs);
	});
});

router.post('/distributors/login', (req, res) => {
	const request = req.body.data;
	console.log(request);
	const distributorInfo = Distributor.findOne({
		distributor_username: request.distributor_username,
		distributor_password: request.distributor_password
	});
	distributorInfo.exec((err, docs) => {
		if (err || docs === null) {
			res.send(false);
		} else {
			res.json(docs);
		}
	});
});



router.put('/distributors/:id', (req, res) => {
	const request = func.removeUndefinedProps(req.body.data);
	let id = req.params.id;

	let dis = Distributor.findByIdAndUpdate( id , request, (err, place) => {
    if (err) return res.send(err);
    console.log(err, place)
		const account = Distributor.find({}, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

module.exports = router;
