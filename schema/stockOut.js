const  mongoose  = require('mongoose')

const stockoutSchema = mongoose.Schema({
    stock_ID :{
        type : String
    },
    product_Name:{
        type:Array
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
    product_stockoutDate:{
        type:String
    },
    distributor_ID :{
        type: String
    },   
    stock_Detail:{
        type:String
    }
    ,   
    stock_Out:{
        type:Array
    }

   
})


module.exports = Stocksout = mongoose.model('stockoutSchema' , stockoutSchema);
