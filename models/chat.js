// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const chatSchema = new Schema({
//     sender: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     senderRead: {
//         type: Boolean,
//         default: false
//     },
//     receiver: {
//         type: mongoose.Schema.Type.ObjectId,
//         ref: 'User'
//     },
//     receiverRead: {
//         type: Boolean,
//         default: false
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     chats: [{
//         senderName: {
//             type: mongoose.Schema.Type.ObjectID,
//             ref: 'User'
//         },

//         senderMessage: {
//             type: String
//         },

//         senderRead: {
//             type: Boolean,
//             default: false
//         },

//         receiverName: {
//             type: mongoose.Schema.Type.ObjectID,
//             ref: 'User'
//         },

//         receiverMessage: {
//             type: String
//         },

//         receiverRead: {
//             type: Boolean,
//             defaut: false

//         },

//         date: {
//             type: Date,
//             default: Date.now
//         },

//     }],
// });

// module.exports = mongoose.model('Chat', chatSchema)