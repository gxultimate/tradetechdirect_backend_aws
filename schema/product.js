const  mongoose  = require('mongoose')

const productSchema = mongoose.Schema({
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
    product_Stocks: {
        type: Number
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
    product_Status : {
        type : String
    }
   
})


module.exports = User = mongoose.model('productSchema' , productSchema);
