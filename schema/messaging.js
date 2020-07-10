const  mongoose  = require('mongoose')

const messagingToken = mongoose.Schema({
    date_Created: {
        type : String
    },
    mesage_Body: {
        type : String
    },
    sender_Name: {
        type : String
    },
    distributor_ID : {
        type : String
    },
    account_ID : {
        type : String
    },
    recipient_Name: {
        type : String
    },
    message_Subject: {
        type: String
    }
})


module.exports = Message = mongoose.model('messagingToken' , messagingToken);
