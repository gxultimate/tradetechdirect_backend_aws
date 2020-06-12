const  mongoose  = require('mongoose')

const distributorSchema = mongoose.Schema({
    distributor_ID : {
        type: String,
    },
    distributor_username : {
        type: String,
    },
    distributor_password : {
        type: String,
    },
    distributor_warehouseName : {
        type: String,
    },
    distributor_address  : {
        type: String,
    },
    distributor_emailAddress : {
        type: String,
    },
    distributor_contactNo : {
        type: String,
    },
    distributor_status : {
        type: String,
    },
    distributor_dateRegistered : {
        type: String,
    }, 
    distributor_tierNo : {
        type: String,
    },
    distributor_accessType : {
        type: String,
    },
    distributor_fName : {
        type: String,
    },
    distributor_lName : {
        type: String,
    },
    distributor_mName : {
        type: String,
    }
})


module.exports = User = mongoose.model('distributorSchema' , distributorSchema);
