const  mongoose  = require('mongoose')

const accessTokenSchema = mongoose.Schema({
    distributor_ID:{
        type: String
    },
    access_Token: {
        type : String
    },
    dateGenerated: {
        type : String
    }
})


module.exports = AccessToken = mongoose.model('accessTokenSchema' , accessTokenSchema);
