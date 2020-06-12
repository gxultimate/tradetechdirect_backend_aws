const  mongoose  = require('mongoose')

const stockSchema = mongoose.Schema({
    stock_ID :{
        type : String
    },
    product_Name:{
        type:String
    },
    product_Category:{
        type:String
    },
    product_UoM:{
        type:String
    },
    product_ID:{
        type:String
    },
    product_Brand:{
        type:String
    },
    product_replenishDate:{
        type:String
    },
    product_expirationDate:{
        type:String
    },
    product_replenishQty :{
        type: Number
    },
    distributor_ID :{
        type: String
    },   

   
})


module.exports = Stocks = mongoose.model('stockSchema' , stockSchema);
