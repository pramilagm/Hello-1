require("../models/user");
const passport = require("passport");
const mongoose = require("mongoose");
const passportFacebook = require("passport-facebook");
const User = mongoose.model("User");
const Message = mongoose.model("Message");
module.exports = {
  loginRegistration: function (req, res) {
    res.render('login', {
      title: "Login",
      layout: false
    })

  },
  homePage: function (req, res) {
    res.render("home", {
      title: "Home"
    });
  },
  aboutPage: function (req, res) {
    res.render("test", {
      title: "About"
    });
  },
  contactPage: function (req, res) {
    res.render("contact", {
      title: "Contact"
    });
  },
  //   postContact: (req, res) => {
  //     console.log(req.body);
  //     const newMessage = {
  //       fullname: req.body.fullname,
  //       email: req.body.email,
  //       message: req.body.message,
  //       date: new Date()
  //     };
  //     new Message(newMessage).save((err, message) => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         Message.find({ _id: req.body._id }).then(message => {
  //           if (message) {
  //             res.redirect("/homePage", {
  //               tittle: "Sent",
  //               messages: message
  //             });
  //           } else {
  //             res.render("noMessage", {
  //               title: "Not found"
  //             });
  //           }
  //         });
  //       }
  //     });
  //   },

  postContact: (req, res) => {
    console.log(req.body);
    const newUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      message: req.body.message,
      date: new Date()
    };
    new User(newUser).save((err, user) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/home");
      }
    });
  },

  show_user: (req, res) => {

    User.findById({
        _id: req.params._id
      })
      .lean()
      .then(user => {
        if (user) {
          req.session.firstname = req.user.firstname
          res.render("home", {
            loggedinUser: user
          });
        } else {
          throw err;
        }
      });
  },
  messageBox: (req, res) => {
    res.render("chatbox");
  },
  profilePage: (req, res) => {
    {
      User.findById({
        _id: req.user._id
      }).then(user => {
        if (user) {
          user.online = true;
          user.save((err, user) => {
            if (err) {
              throw err;
            } else {
              res.render("home", {
                title: "home",
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
    }).then(user => {
      user.online = false;
      user.save((err, user) => {
        if (err) {
          throw err;
        }
        if (user) {
          // req.logout();
          res.redirect("/");
        }
      });
    });
  },

  facebookAuth: passport.authenticate("facebook", {
    scope: ["email"]
  }),

  AuthenticateUser: passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
};