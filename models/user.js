<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook: {
        type: String
    },

    google: {
        type: String
    },

    firstname: {
        type: String
    },

    lastname: {
        type: String
    },

    fullname: {
        type: String
    },

    image: {
        type: String
    },

    email: {
        type: String
    },

    city: {
        type: String,

    },

    country: {
        type: String
    },

    online: {
        type: Boolean,
        default: false
    },

    wallet: {
        type: Number,
        default: 0
    },

});

module.exports = mongoose.model('User', userSchema);
=======
>>>>>>> f491b07b916bf606a137502005391f846f551c74
