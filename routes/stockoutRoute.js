var express = require('express');
var router = express.Router();
var Stock = require("../schema/stockOut")
var Product = require('../schema/product')
var Function =  require('./function');
var func = new Function()

router.post('/stockout/:id', (req, res) => {
  const request = req.body.data;
  let stockItem = 0
  let id = req.params.id

  Product.findById({ _id: id }, (err, place) => {
    if (err) return res.send(err);
    stockItem += parseInt(place.product_Stocks)
  })
  console.log(request)

  const stock = new Stock(
    {
      stock_ID: request.stock_ID,
      product_ID: request.product_ID,
      product_Name: request.product_Name,
      product_Category: request.product_Category,
      product_UoM: request.product_UoM,
      product_Brand: request.product_Brand,
      product_stockoutDate: request.product_stockoutDate,

      distributor_ID: request.distributor_ID,
      stock_Detail: request.distributor_ID,
      stock_Out: parseInt(request.stock_Out),
  
    })
  stock.save()
    .then(result => {
      let qty = { 
        product_Stocks:  parseInt(stockItem) - parseInt(request.stock_Out)}
      Product.findByIdAndUpdate({ _id: id }, qty, { new: true, useFindAndModify: false }, (err, place) => {
        if (err) return res.send(err);
        const product = Product.find({ distributor_ID: request.distributor_ID }, (err, docs) => {
          setTimeout(() => {
            res.json(docs)
          }, 1200);
        })
      })
    })
    .catch(err => {
      res.json({ 'status': false })
    })

})


router.get('/stockout/:id', (req, res) => {
  let id = req.params.id
  const stocks = Stock.find({ distributor_ID: id }, (err, docs) => {
    res.json(docs)
  })
})




router.put('/stockout/:id', function (req, res) {
  const request = func.removeUndefinedProps(req.body.data);

  let id = req.params.id
  Stock.findByIdAndUpdate({ _id: id }, request, { new: true, useFindAndModify: false }, (err, place) => {
    if (err) return res.send(err);
    const stock = Stock.find({}, (err, docs) => {
      setTimeout(() => {
        res.json(docs)
      }, 1200);
    })
  })

})




module.exports = router;
