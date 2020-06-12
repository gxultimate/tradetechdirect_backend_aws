var express = require('express');
var router = express.Router();
var Account = require('../schema/account');
var Distributor = require('../schema/distributor');
var bcrypt = require('bcryptjs');
var saltRounds = 10;

let hashPassword = (password) => {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			return password;
		});
	});
};
function decryptPassword(hash, password) {
	bcrypt.compare(password, hash, (err, result) => {
		return result;
	});
}

router.post('/accounts', (req, res) => {
	const request = req.body.data;
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(request.account_password, salt);
	// console.log(request,"req")
	const account = new Account({
		account_ID: request.account_ID,
		account_username: request.account_username,
		account_password: hash,
		account_fName: request.account_fName,
		account_lName: request.account_lName,
		account_mName: request.account_mName,
		account_suffix: request.account_suffix,
		account_address: request.account_address,
		account_emailAddress: request.account_emailAddress,
		account_contactNo: request.account_contactNo,
		account_status: request.account_status,
		account_dateRegistered: request.account_dateRegistered,
		account_contract: request.account_contract,
		account_birthday: request.account_birthday,
		account_accessType: request.account_accessType,
		distributor_ID: request.distributor_ID,
		staff_Role: request.staff_Role,
		account_storeName: request.account_storeName
	});
	account
		.save()
		.then((result) => {
			const account = Account.find({}, (err, docs) => {
				setTimeout(() => {
					console.log(docs.length)
					res.json(docs);
				}, 1200);
			});
		})
		.catch((err) => {
			console.log(err)
			res.json({ status: false });
		});
});

router.get('/accounts', async (req, res) => {
	const account = await Account.find({});
	res.send(account)
});

router.get('/accounts/:id', (req, res) => {
	let id = req.params.id;
	const account = Account.find({ account_ID: id }, (err, docs) => {
		res.json(docs);
	});
});

router.post('/accounts/login', (req, res) => {
	const request = req.body.data;
	console.log(request);

	const accountInfo = Account.findOne({
		account_username: request.account_username
	});
	const distributorInfo = Distributor.findOne({
		distributor_username: request.account_username
	});

	accountInfo.exec((err, docs) => {
		if (err || docs === null) {
			distributorInfo.exec((err, docs2) => {
				if (err || docs2 === null) {
					res.send(false);
				} else {
					if (bcrypt.compareSync(request.account_password, docs2.distributor_password) === true)
						res.json(docs2);
					else if (request.account_password === docs2.distributor_password) res.json(docs2);
					else res.send(false);
				}
			});
		} else {
			if (bcrypt.compareSync(request.account_password, docs.account_password) === true) res.json(docs);
			else if (request.account_password === docs.account_password) res.json(docs);
			else res.send(false);
		}
	});
});

router.post('/accounts/:id', function(req, res) {
	const request = req.body.data;

	let id = req.params.id;

	Account.findByIdAndUpdate({ _id: id }, request, { new: true }, (err, place) => {
		if (err) return res.send(err);
		const account = Account.find({}, (err, docs) => {
			setTimeout(() => {
				res.json(docs);
			}, 1200);
		});
	});
});

module.exports = router;
