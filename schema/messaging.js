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
    sender_ID : {
        type : String
    },
    recipient_ID : {
        type : String
    },
    recipient_Name: {
        type : String
    },
    message_Subject: {
        type: String
    },
    message_ID:{
        type:String
    },
    message_Status:{
        type:String
    }
})


module.exports = Message = mongoose.model('messagingToken' , messagingToken);
