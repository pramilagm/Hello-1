const passport = require('passport');
const mongoose = require("mongoose");
const passportFacebook = require('passport-facebook');
const User = mongoose.model("User");
const Message = mongoose.model('Message');
module.exports = {
    homePage: function(req, res) {
        res.render('home', {
            title: 'Home'
        })

    },
    aboutPage: function(req, res) {
        res.render('about', {
            title: 'About'
        });
    },
    contactPage: function(req, res) {
        res.render('contact', {
            title: 'Contact'
        })

    },
    postContact: (req, res) => {
        console.log(req.body);
        const newMessage = {
            fullname: req.body.fullname,
            email: req.body.email,
            message: req.body.message,
            date: new Date()
        }
        new Message(newMessage).save((err, message) => {
            if (err) {
                throw err;
            } else {
                Message.find({}).then((message) => {
                    if (message) {
                        res.render('newmessage', {
                            tittle: 'Sent',
                            messages: message
                        });
                    } else {
                        res.render('noMessage', {
                            title: 'Not found'
                        });
                    }
                });
            }
        });


    },
    profilePage: (req, res) => {
        {
            User.findById({
                _id: req.user._id
            }).then((user) => {
                if (user) {
                    user.online = true;
                    user.save((err, user) => {
                        if (err) {
                            throw err;
                        } else {
                            res.render('profile', {
                                title: 'Profile',
                                user: user
                            });
                        }
                    });
                }

            });
        }


    },
    logout: (req, res) => {
        User.findById({
                _id: req.user._id
            })
            .then((user) => {
                user.online = false;
                user.save((err, user) => {
                    if (err) {
                        throw err;
                    }
                    if (user) {
                        req.logout();
                        res.redirect('/');
                    }
                })
            })
    },

    facebookAuth: passport.authenticate('facebook', {
        scope: ['email']
    })

    ,
    AuthenticateUser: passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })


}