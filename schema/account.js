const  mongoose  = require('mongoose')

const accountSchema = mongoose.Schema({
    account_ID : {
        type: String,
    },
    account_username : {
        type: String,
    },
    account_password : {
        type: String,
    },
    account_fName : {
        type: String,
    },
    account_lName : {
        type: String,
    },
    account_mName : {
        type: String,
    },
    account_suffix : {
        type: String,
    },
    account_address  : {
        type: String,
    },
    account_emailAddress : {
        type: String,
    },
    account_contactNo : {
        type: String,
    },
    account_status : {
        type: String,
    },
    account_dateRegistered : {
        type: String,
    },
    account_contract : {
        type: String,
    },
    account_birthday: {
        type: String
    },
    account_accessType : {
        type: String,
    },
    staff_Role :{
        type : String,
    },
    distributor_ID:{
        type: String,
    },
    account_storeName : {
        type : String,
        required: true
    },
    account_storeAddress: {
        type : String,
        required: true
    }
    
})


module.exports = User = mongoose.model('accountSchema' , accountSchema);
