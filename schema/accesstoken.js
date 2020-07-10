const  mongoose  = require('mongoose')

const accessTokenSchema = mongoose.Schema({
    distributor_ID:{
        type: String
    },
    access_Token: {
        type : String
    },
    date_Generated: {
        type : String
    }
})


module.exports = AccessToken = mongoose.model('accessTokenSchema' , accessTokenSchema);
