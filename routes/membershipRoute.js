let express = require('express'),
    router = express.Router(),
    Membership = require('../schema/membership'),
    uuidv4 = require('uuid/v4'),
    Function = require('./function'),
    func = new Function(),
    moment = require('moment');

router.post('/membership', (req, res) => {
    const request = req.body.data;
    const membership = new Membership({
        membership_ID:request.membership_ID,
        distributor_ID:request.distributor_ID,
        account_ID:request.account_ID,
        access_Token:request.access_Token

    });
    membership
        .save()
        .then((result) => {
            const membership = Membership.find({distributor_ID:request.distributor_ID}, (err, docs) => {
                setTimeout(() => {
                    res.json(docs);
                }, 1200);
            });
        })
        .catch((err) => {
            res.json({ status: false });
        });
});


router.get('/membership/:id', async (req, res) => {
    const id = req.params.id;
    await Membership.find({ membership_ID: id }, (err, docs) => {
        if (docs.length !== 0) {
            res.json(docs);
        } else {
            Membership.find({ distributor_ID: id }, (err, doc) => {
                if (doc.length !== 0) {
                    res.json(doc);
                } else {
                    Membership.find({ account_ID: id }, (err, docs2) => {
                        res.json(docs2);
                    });
                }
            });
        }
    });
});



router.put('/membership/:id', function (req, res) {
    const request = func.removeUndefinedProps(req.body.data);
    let id = req.params.id;
    Membership.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
        if (err) return res.send(err);
        const membership = Membership.findById({_id:id }, (err, docs) => {
            setTimeout(() => {
                res.json(docs);
            }, 1200);
        });
    });
});

module.exports = router;
