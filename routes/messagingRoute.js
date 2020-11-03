const { request } = require('express');

let express = require('express'),
    router = express.Router(),
    Messaging = require("../schema/messaging"),
    uuidv4 = require('uuid/v4'),
    moment = require('moment'),
    Function = require('./function'),
    func = new Function();

router.post('/message', (req, res) => {
    const request = req.body.data

    const messaging = new Messaging(
        {
            message_ID: request.message_ID,
            date_Created: request.date_Created,
            mesage_Body: request.mesage_Body,
            sender_Name: request.sender_Name,
            sender_ID: request.sender_ID,
            recipient_ID: request.recipient_ID,
            recipient_Name: request.recipient_Name,
            message_Subject : request.message_Subject,
            message_Status : request.message_Status,
        }
    )
    messaging
        .save()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({ 'status': false })
        })
})

router.get('/message', async (req, res) => {
	await Messaging.find({ }, (err, docs) => {
		if (docs.length !== 0) {
			res.json(docs);
		} 
		
	});
});

router.get('/message/:id', (req, res) => {
    const id = req.params.id
    Messaging.findById({ _id: id }, (err, docs) => {
        if (docs.length !== 0) {
            res.json(docs)
        }
        else {
            Messaging.find({ sender_ID: id }, (err, docs) => {
                if (docs.length !== 0) {
                    res.json(docs)
                } else {
                    res.send(false)
                }
            })
        }
    })
})



router.put('/message/:id', function (req, res) {
    const request = func.removeUndefinedProps(req.body.data);
    let id = req.params.id
    Messaging.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
        if (err) return res.send(err);
        else res.json(place)
    })

})


module.exports = router;
