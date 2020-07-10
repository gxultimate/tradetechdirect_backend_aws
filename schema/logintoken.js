const  mongoose  = require('mongoose')

const loginTokenSchema = mongoose.Schema({
    login_Token: {
        type : String
    },
    date_Generated: {
        type : String
    },
    time_Expiry : {
        type: String
    }
    
})


module.exports = AccessToken = mongoose.model('loginTokenSchema' , loginTokenSchema);
