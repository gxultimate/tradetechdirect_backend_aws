let express = require('express'),
  router = express.Router(),
  AccessToken = require("../schema/accesstoken"),
  uuidv4 = require('uuid/v4'),
  moment = require('moment'),
  Function = require('./function'),
  func = new Function();

router.post('/token', (req, res) => {
  const request = req.body.data;
  const uuid = uuidv4().split('').slice(0, 7).join("");
  const accesstoken = new AccessToken(
    {
      access_Token: `${request.distributor_warehouseName.toLowerCase().replace(/ +/g, "")}${uuid}`,
      date_Generated: moment().format('LL'),
      distributor_ID : request.distributor_ID
    }
  )
  accesstoken
    .save()
    .then(result => {
      const accesstoken = AccessToken.find({}, (err, docs) => {
        setTimeout(() => {
          res.json(docs)
        }, 1200);

      })
    })
    .catch(err => {
      res.json({ 'status': false })
    })
})

router.get('/token', async (req, res) => {
	await AccessToken.find({ }, (err, docs) => {
		if (docs.length !== 0) {
			res.json(docs);
		} 
		
	});
});

router.get('/token/:id', (req, res) => {
  const id = req.params.id
  if (id !== null || id !== ""){
    AccessToken.find({ distributor_ID: id }, (err, docs) => {
      if (docs.length !== 0) {
        res.json(docs)
      }
      else {
        AccessToken.find({ access_Token: id }, (err, doc) => {
          res.json(doc)
        })
      }
    })
  }
  else{
		res.sendStatus(403).send(false)
	}
})



router.put('/token/:id', function (req, res) {
  const request = func.removeUndefinedProps(req.body.data);

  let id = req.params.id

  AccessToken.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
    if (err) return res.send(err);
    const accesstoken = AccessToken.find({}, (err, docs) => {
      setTimeout(() => {
        res.json(docs)
      }, 1200);
    })
  })

})




module.exports = router;
