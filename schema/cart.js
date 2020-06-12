const  mongoose  = require('mongoose')

const cartSchema = mongoose.Schema({
   cart_ID : {
    type: String
   },
   account_ID :{
       type: String
   },
   product_ID: {
    type: String,
    },
    product_Name: {
        type: String,
    },
    product_Category:{
        type: String
    },
    product_Description: {
        type: String,
    },
    product_Price: {
        type: String,
    },
    product_UoM: {
        type: String,
    },
    product_Img: {
        type: String,
    },
    product_Barcode: {
        type: String,
    },
    product_Brand: {
        type: String,
    },
    product_DateReceived: {
        type: String,
    },
    product_ExpirationDate: {
        type: String,
    },
    product_Remarks: {
        type: String,
    },
    product_SubCategory:{
        type: String
    },
    distributor_ID :{
        type: String
    },
    product_Quantity : {
        type : String
    },
    product_TransactionDate : {
        type : String
    },    
    product_TotalAmount : {
        type: String
    }
   
})


module.exports = Cart = mongoose.model('cartSchema' , cartSchema);
