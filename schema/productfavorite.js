const mongoose = require('mongoose')

const productFavorite = mongoose.Schema({
    list_productID: {
        type: Array,
    },
    account_ID: {
        type: String
    },product_ID: {
        type: String
    },
    status: {
        type: String
    }


})


module.exports = ProductFavorite = mongoose.model('productFavorite', productFavorite);
