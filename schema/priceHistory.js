const  mongoose  = require('mongoose')

const priceHistorySchema = mongoose.Schema({
    priceHistID: {
        type: String,
    },
    product_ID: {
        type: String,
    },
    priceFrom:{
        type: Number
    },
    priceTo: {
        type: Number,
    },
    dateCreated: {
        type: String,
    },

   
})


module.exports = PriceHistory = mongoose.model('priceHistorySchema' , priceHistorySchema);
