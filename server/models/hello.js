const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },

    messages: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.export = mongoose.model('Message', messagesSchema);