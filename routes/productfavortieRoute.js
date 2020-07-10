let express = require('express'),
    router = express.Router(),
    ProductFavorite = require("../schema/productfavorite"),
    uuidv4 = require('uuid/v4'),
    moment = require('moment'),
    Function = require('./function'),
    func = new Function();

router.post('/productfavorite', (req, res) => {
    const request = req.body.data
    const productfavorite = new ProductFavorite(
        {
            list_productID: request.list_productID,
            account_ID: request.account_ID

        }
    )
    productfavorite
        .save()
        .then(result => {
            ProductFavorite.find({ account_ID: request.account_ID }, (err, docs) => {
                if (err) res.send(err)
                else res.json(docs)
            })
        })
        .catch(err => {
            res.json({ 'status': false })
        })
})


router.get('/productfavorite/:id', (req, res) => {
    const id = req.params.id
    ProductFavorite.findById({ _id: id }, (err, docs) => {
        if (docs.length !== 0) {
            res.json(docs)
        }
        else {
            res.send(false)
        }
    })
})



router.put('/productfavorite/:id', function (req, res) {
    const request = func.removeUndefinedProps(req.body.data);

    let id = req.params.id
    ProductFavorite.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
        if (err) return res.send(err);
        const product = Product.find({}, (err, docs) => {
            setTimeout(() => {
                res.json(docs)
            }, 1200);
        })
    })

})




module.exports = router;
