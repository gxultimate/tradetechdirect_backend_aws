var express = require('express');
var router = express.Router();
var Inventory = require("../schema/inventory")

    router.post('/inventory', (req, res) => {
        const request = req.body.data;
        console.log(request)

        const inventory = new Inventory(
        {
            product_ID: request.product_ID,
            product_Name: request.product_Name,
            product_Category:request.product_Category,
            product_SubCategory:request.product_SubCategory,
            product_Description: request.product_Description,
            product_Price: request.product_Price,
            product_UoM: request.product_UoM,
            product_Img: request.product_Img,
            product_Barcode: request.product_Barcode,
            product_Brand: request.product_Brand,
            product_DateReceived: request.product_DateReceived,
            product_ExpirationDate: request.product_ExpirationDate,
            product_Remarks: request.product_Remarks,
            distributor_ID: request.distributor_ID,
            product_Stocks : request.product_Stocks,

        })
            inventory
            .save()
            .then(result => {
                setTimeout(() => {
                    const inventory = Inventory.find({} , (err, docs) => {
                        // console.log(docs, "mewos")
                       
                        res.json(docs)
                    })
                }, 1200);
              
            })
            .catch(err => {
            res.json({'status': false})
            }) 
    })


    router.get('/inventory/:id' , (req , res) => {
        let id = req.params.id
        const inventory = Inventory.find({distributor_ID: id} , (err, docs) => {
            res.json(docs)
        })
    })



    
  router.put('/inventory/:id', function (req, res) {
    const request = req.body.data;
    
    let id = req.params.id
    Inventory.findByIdAndUpdate({_id : id} , request , {new: true}, (err, place)=> {
      if(err) return res.send(err);
      const inventory = Inventory.find({} , (err, docs) => {
        setTimeout(() => {
          res.json(docs)
         }, 1200);
      })
    } )
  
  }) 
  

  






    module.exports = router;
