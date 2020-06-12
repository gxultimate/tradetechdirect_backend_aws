   var express = require('express');
var router = express.Router();
var Stock = require("../schema/stocks")
var Product = require('../schema/product')

router.post('/stock/:id', (req, res) => {
    const request = req.body.data;
    let stockItem = 0
    let id = req.params.id
       
        Product.findById({_id : id}  , (err, place)=> {
          if(err) return res.send(err);
          stockItem += parseInt(place.product_Stocks)
          })
     console.log(request)
         
        const stock = new Stock(
        {
            stock_ID : request.stock_ID,
            product_ID: request.product_ID,
            product_Name:request.product_Name,
            product_Category:request.product_Category,
            product_UoM:request.product_UoM,
            product_Brand:request.product_Brand,
            product_replenishDate:request.product_replenishDate,
            product_expirationDate:request.product_expirationDate,
            distributor_ID : request.distributor_ID,
            product_replenishQty:  parseInt(request.product_replenishQty)
        })
        stock.save()
            .then(result => {
              let qty = { product_Stocks: parseInt(stockItem) + parseInt(request.product_replenishQty)}
              Product.findByIdAndUpdate({_id : id} , qty , {new: true}, (err, place)=> {
                if(err) return res.send(err);
                const product = Product.find({distributor_ID: request.distributor_ID} , (err, docs) => {
                  setTimeout(() => {
                   res.json(docs)
                   }, 1200);
                })
              })
      })   
            .catch(err => {
            res.json({'status': false})
            }) 

    })


    router.get('/stock/:id' , (req , res) => {
        let id = req.params.id
        const stocks = Stock.find({distributor_ID: id} , (err, docs) => {
            res.json(docs)
        }) 
    })



    
  router.put('/stock/:id', function (req, res) {
    const request = req.body.data;
    
    let id = req.params.id
    Stock.findByIdAndUpdate({_id : id} , request , {new: true}, (err, place)=> {
      if(err) return res.send(err);
      const stock = Stock.find({} , (err, docs) => {
        setTimeout(() => {
          res.json(docs)
         }, 1200);
      })
    } )
  
  }) 
  



    module.exports = router;
