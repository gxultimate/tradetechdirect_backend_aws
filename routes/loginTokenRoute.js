let express = require('express'),
    router = express.Router(),
    LoginToken = require("../schema/logintoken"),
    uuidv4 = require('uuid/v4'),
    moment = require('moment'),
    Function = require('./function'),
    func = new Function();

router.post('/createtoken/:id', (req, res) => {
    const rid = req.params.id;
    const uuid = uuidv4().split('').slice(0, 7).join("");

    const logintoken = new LoginToken(
        {
            login_Token: `${rid.toLowerCase().replace(/ +/g, "")}${uuid}`,
            date_Generated: moment().format('LL'),
            time_Expiry: moment(moment(moment().format('LLL')).add(1, "hour")).format('LLL')
        }
    )
    logintoken
        .save()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json({ 'status': false })
        })
})


router.get('/retrievetoken/:id', (req, res) => {
    const id = req.params.id
    LoginToken.find({ access_Token: id }, (err, docs) => {
        if (docs.length !== 0) {
            if (moment.duration(moment(moment().format("LLL"), "LLL").diff(moment(docs.time_Expiry, "LLL"))) > 1) {
                res.send(false)
            }
            else {
                res.json(docs)
            }
        }
        else {
            res.send(false)
        }
    })
})




module.exports = router;
