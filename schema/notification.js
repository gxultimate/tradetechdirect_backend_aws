const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    notif_ID: {
        type: String
    },
    account_ID: {
        type: String
    },
    distributor_ID: {
        type: String
    },
    order_ID: {
        type: String
    },
    sender_ID: {
        type: String
    },
    notif_subject: {
        type: String
    },
    notif_description: {
        type: String
    },
    notif_date: {
        type: String
    },
    notif_status: {
        type: String
    },

});

module.exports = Report = mongoose.model('notificationSchema', notificationSchema);
