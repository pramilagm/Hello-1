var express = require('express');
var app = express();
var formidable = require('formidable');
var User = require('../models/user');
var path = require('path');
var async = require('async');

// Get Homepage
app.get('/search', ensureAuthenticated, function (req, res) {

    res.render('search', {
        newfriend: req.user.request,

    });
});
app.get('/find', function (req, res) {
    User.find({
        fullname: req.body.fullname,
    })
})

app.get('/search', ensureAuthenticated, function (req, res) {
    var sent = [];
    var friends = [];
    var received = [];
    received = req.user.request;
    sent = req.user.sentRequest;
    friends = req.user.friendsList;



    User.find({
        fullname: {
            $ne: req.user.fullname
        }
    }, function (err, result) {
        if (err) throw err;

        res.render('search', {
            result: result,
            sent: sent,
            friends: friends,
            received: received
        });
    });
});

app.post('/search', ensureAuthenticated, function (req, res) {
    var searchfriend = req.body.searchfriend;
    if (searchfriend) {
        var mssg = '';
        if (searchfriend == req.user.fullname) {
            searchfriend = null;
        }
        User.find({
            fullname: {
                "$regex": searchfriend,
                "$options": "i"
            }
        }, function (err, result) {
            if (err) throw err;
            res.render('search', {
                result: result,

                mssg: mssg

            }, console.log("Found:" + result));
        }).lean();
    }

    async.parallel([
            function (callback) {
                if (req.body.receiverName) {
                    User.update({
                        'fullname': req.body.receiverName,
                        'request.userId': {
                            $ne: req.user._id
                        },
                        'friendsList.friendId': {
                            $ne: req.user._id
                        }
                    }, {
                        $push: {
                            request: {
                                userId: req.user._id,
                                fullname: req.user.fullname
                            }
                        },
                        $inc: {
                            totalRequest: 1
                        }
                    }, (err, count) => {
                        console.log(err);
                        callback(err, count);
                    })
                }
            },
            function (callback) {
                if (req.body.receiverName) {
                    User.update({
                        'fullname': req.user.fullname,
                        'sentRequest.fullname': {
                            $ne: req.body.receiverName
                        }
                    }, {
                        $push: {
                            sentRequest: {
                                fullname: req.body.receiverName
                            }
                        }
                    }, (err, count) => {
                        callback(err, count);
                    })
                }
            }
        ],
        (err, results) => {
            res.redirect('/search');
        });

    async.parallel([
        // this function is updated for the receiver of the friend request when it is accepted
        function (callback) {
            if (req.body.senderId) {
                User.update({
                    '_id': req.user._id,
                    'friendsList.friendId': {
                        $ne: req.body.senderId
                    }
                }, {
                    $push: {
                        friendsList: {
                            friendId: req.body.senderId,
                            friendName: req.body.senderName
                        }
                    },
                    $pull: {
                        request: {
                            userId: req.body.senderId,
                            fullname: req.body.senderName
                        }
                    },
                    $inc: {
                        totalRequest: -1
                    }
                }, (err, count) => {
                    callback(err, count);
                });
            }
        },
        // this function is updated for the sender of the friend request when it is accepted by the receiver	
        function (callback) {
            if (req.body.senderId) {
                User.update({
                    '_id': req.body.senderId,
                    'friendsList.friendId': {
                        $ne: req.user._id
                    }
                }, {
                    $push: {
                        friendsList: {
                            friendId: req.user._id,
                            friendName: req.user.fullname
                        }
                    },
                    $pull: {
                        sentRequest: {
                            fullname: req.user.fullname
                        }
                    }
                }, (err, count) => {
                    callback(err, count);
                });
            }
        },
        function (callback) {
            if (req.body.user_Id) {
                User.update({
                    '_id': req.user._id,
                    'request.userId': {
                        $eq: req.body.user_Id
                    }
                }, {
                    $pull: {
                        request: {
                            userId: req.body.user_Id
                        }
                    },
                    $inc: {
                        totalRequest: -1
                    }
                }, (err, count) => {
                    callback(err, count);
                });
            }
        },
        function (callback) {
            if (req.body.user_Id) {
                User.update({
                    '_id': req.body.user_Id,
                    'sentRequest.fullname': {
                        $eq: req.user.fullname
                    }
                }, {
                    $pull: {
                        sentRequest: {
                            fullname: req.user.fullname
                        }
                    }
                }, (err, count) => {
                    callback(err, count);
                });
            }
        }
    ], (err, results) => {
        res.redirect('/search');
    });
});

app.post('/', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);
    let reqPath = path.join(__dirname, '../');
    let newfilename;
    form.on('fileBegin', function (name, file) {
        file.path = reqPath + 'public/upload/' + req.user.fullname + file.name;
        newfilename = req.user.fullname + file.name;
    });
    form.on('file', function (name, file) {
        User.findOneAndUpdate({
                fullname: req.user.fullname
            }, {
                'userImage': newfilename
            },
            function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
    });
    req.flash('success_msg', 'Your profile picture has been uploaded');
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = app;