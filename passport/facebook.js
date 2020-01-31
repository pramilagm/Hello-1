const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

const keys = require('../config/keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: keys.FacebookAppID,
    clientSecret: keys.FacebookAppSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['email', 'name', 'displayName', 'photos']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOne({
        facebook: profile.id
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        } else {
            const newUser = {
                facebook: profile._id,
                fullname: profile.displayName,
                lastname: profile.name.familyName,
                firstname: profile.name.givenName,
                image: profile.photos[0].value,
                email: profile.emails[0].value,
            }

            new User(newUser).save((err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                }
            });
        }
    });
}));