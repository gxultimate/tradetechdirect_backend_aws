
const mongoose = require('mongoose')

const membershipSchema = mongoose.Schema({
    membership_ID: {
        type: String
    },
    distributor_ID: {
        type: String
    },
    account_ID: {
        type: String
    },
    access_Token: {
        type: String
    },
    distributor_wHouse:{
        type:String
    },

})


module.exports = Membership = mongoose.model('membershipSchema', membershipSchema);
