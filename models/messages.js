const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },

    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Message', messagesSchema);