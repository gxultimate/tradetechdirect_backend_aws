let express = require('express'),
    router = express.Router(),
    Notification = require('../schema/notification'),
    uuidv4 = require('uuid/v4'),
    Function = require('./function'),
    func = new Function(),
    moment = require('moment');

router.post('/notification', (req, res) => {
    const request = req.body.data;
    const notification = new Notification({
        notif_ID: uuidv4(),
        account_ID: request.account_ID,
        distributor_ID: request.distributor_ID,
        order_ID: request.order_ID,
        sender_ID: request.sender_ID,
        notif_subject: request.notif_subject,
        notif_description: request.notif_description,
        notif_date: request.notif_date,
        notif_status: request.notif_status,

    });
    notification
        .save()
        .then((result) => {
            const notification = Notification.find({distributor_ID:request.distributor_ID}, (err, docs) => {
                setTimeout(() => {
                    res.json(docs);
                }, 1200);
            });
        })
        .catch((err) => {
            res.json({ status: false });
        });
});


router.get('/notification/:id', async (req, res) => {
    const id = req.params.id;
    await Notification.find({ notif_ID: id }, (err, docs) => {
        if (docs.length !== 0) {
            res.json(docs);
        } else {
            Notification.find({ distributor_ID: id }, (err, doc) => {
                if (doc.length !== 0) {
                    res.json(doc);
                } else {
                    Notification.find({ account_ID: id }, (err, docs2) => {
                        res.json(docs2);
                    });
                }
            });
        }
    });
});



router.put('/notification/:id', function (req, res) {
    const request = func.removeUndefinedProps(req.body.data);
    let id = req.params.id;
    Notification.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
        if (err) return res.send(err);
        const notification = Notification.findById({_id:id }, (err, docs) => {
            setTimeout(() => {
                res.json(docs);
            }, 1200);
        });
    });
});

module.exports = router;
