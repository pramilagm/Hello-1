const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook: {
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

    message: String,
    userImage: {
        type: String,
        default: 'default.png'
    },
    sentRequest: [{
        username: {
            type: String,
            default: ''
        }
    }],
    request: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
            default: ''
        }
    }],
    friendsList: [{
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        friendName: {
            type: String,
            default: ''
        }
    }],
    totalRequest: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('User', userSchema);