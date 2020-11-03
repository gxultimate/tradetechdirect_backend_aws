var express = require('express');
var router = express.Router();
var Product = require("../schema/product"),
multer = require('multer'),
cloudinary = require('cloudinary'),
cloudinaryStorage = require('multer-storage-cloudinary'),
uuidv4 = require('uuid/v4'),
lokijs  = require('lokijs'),
Function = require('./function'),
func = new Function(),
fs = require('fs');

cloudinary.config({
cloud_name: 'startupprojectventuresph',
api_key: '612946895398148',
api_secret: 'AhDTe8M4JfnoDluJ8Rm7nyMpcKA'
})

var db = new lokijs('product.json')

var products = db.addCollection('product' , {indices: ['product_ID']})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "product",
  allowedFormats: ["jpg", "png"],
  transformation: [{quality: 'auto' }]
  });
  const parser = multer({ storage: storage });




router.post('/upload', parser.single('productImg') ,(req , res, next) => {
  const image = {};
  image.url = req.file.secure_url;
  image.id = req.file.public_id;
  res.json(image)
})


    router.post('/product', (req, res) => {
        const request = req.body.data;
        
        const product = new Product(
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
            product_Stocks: request.product_Stocks,
            product_Status:request.product_Status,
            product_Favorite:request.product_Favorite,
            product_Packaging:request.product_Packaging,
            product_Variant:request.product_Variant,
        })
            product
            .save()
            .then(result => {
                setTimeout(() => {
                    const product = Product.find({} , (err, docs) => {
                      docs.map(prod =>{
                        products.insert(prod)
                        db.saveDatabase(prod)
                    })
                        res.json(docs)
                    })
                }, 1200);
              
            })
            .catch(err => {
            res.json({'status': false})
            }) 

            
    })


    router.get('/products/:id' , (req , res) => {
        let id = req.params.id
        if (products.find({distributor_ID: id}).length !== 0){
          res.json(products.find({distributor_ID: id}))
      }
      else{
        const product = Product.find({distributor_ID: id} , (err, docs) => {
          docs.map(prod =>{
            products.insert(prod)
                   db.saveDatabase(prod)
        })
          res.json(docs)
      })
      }
  
     
    })



    
  router.put('/product/:id', function (req, res) {
    const request = func.removeUndefinedProps(req.body.data);
    
    let id = req.params.id
    Product.findByIdAndUpdate({_id : id} , request , {new: true,useFindAndModify: false}, (err, place)=> {
      if(err) return res.send(err);
      const product = Product.find({} , (err, docs) => {
        setTimeout(() => {
          res.json(docs)
         }, 1200);
      })
    } )
  
  }) 
  

  



    

    module.exports = router;
