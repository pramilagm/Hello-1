<<<<<<< HEAD
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
=======
>>>>>>> f491b07b916bf606a137502005391f846f551c74
