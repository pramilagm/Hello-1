const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcryptjs");
const passportFacebook = require("passport-facebook");
const passportGoogle = require("passport-google-oauth20");
const app = express();
const User = require("./models/user");
const Message = require("./models/messages");
const searchfriends = require("./routes/friends.js");
//load keys file
const Keys = require("./config/keys");
//Load Helpers
const {
    requireLogin,
    ensureGuest
} = require("./helpers/auth.js");

//use body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//configuration for authentication
app.use(cookieParser());
app.use(
    session({
        secret: "hooplahMedoozalah",
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//set up express static folder to serve js, css files
app.use(express.static("public"));

//Make user global object
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
const server = app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

//load facebook / google strategy
require("./passport/facebook");
require("./passport/google");
require('./passport/local');
//for socket
const io = require("socket.io")(server);

require("./socket/friend")(io);

//connect to mLab MongoDB
mongoose
    .connect(Keys.MongoDB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Server is conncted to MongoDB");
    })
    .catch(err => {
        console.log(err);
    });

// environment variable for port
const port = process.env.PORT || 3000;
//set up view engine
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

app.get("/", ensureGuest, (req, res) => {
    res.render("home", {
        title: "Home"
    });
});

app.get("/about", ensureGuest, (req, res) => {
    res.render("about", {
        title: "About"
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact"
    });
});

app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        scope: ["email"]
    })
);
app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/profile",
        failureRedirect: "/"
    })
);
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirecty: "/profile",
        failureRedirect: "/"
    })
);
app.get("/profile", requireLogin, (req, res) => {
    console.log(req.user);
    User.findById({
        _id: req.user._id
    }).then(user => {
        if (user) {
            user.online = true;
            user.save((err, user) => {
                if (err) {
                    throw err;
                } else {
                    console.log(user.picture);
                    res.render("profile", {
                        title: "Profile",
                        user: user.toObject()
                    });
                }
            });
        }
    });
});
app.get("/newAccount", (req, res) => {
    res.render("newAccount", {
        title: "Signup"
    });
});
app.post("/signup", (req, res) => {
    console.log(req.body);
    let errors = [];

    if (req.body.password !== req.body.password2) {
        errors.push({
            text: "Password does not match"
        });
    }
    if (req.body.password.length < 5) {
        errors.push({
            text: "Password must be at least 5 characters"
        });
    }
    if (errors.length > 0) {
        res.render("newAccount", {
            errors: errors,
            title: "Error",
            fullname: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                let errors = [];
                errors.push({
                    text: "Email already exists"
                });
                res.render("newAccount"), {
                    title: "SignUp",
                    errors: errors
                };
            } else {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                const newUser = {
                    fullname: req.body.username,
                    email: req.body.email,
                    password: hash
                };
                console.log(newUser);
                new User(newUser).save((err, user) => {
                    if (err) {
                        throw err;
                    }
                    if (user) {
                        let success = [];
                        success.push({
                            text: "You successfully created an account. You can login now"
                        });
                        res.render('home', {
                            errors: success
                        });
                    }
                })
            }
        });
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/loginErrors'
}));
app.get('/loginErrors', (req, res) => {
    let errors = [];
    errors.push({
        text: 'User Not Found or Password Incorrect'
    });
    res.render('home', {
        errors: errors
    })
})
app.get("/logout", (req, res) => {
    User.findById({
        _id: req.user._id
    }).then(user => {
        user.online = false;
        user.save((err, user) => {
            if (err) {
                throw err;
            }
            if (user) {
                req.logout();
                res.redirect("/");
            }
        });
    });
});

app.post("/contactUs", (req, res) => {
    console.log(req.body);
    const newMessage = {
        full_name: req.body.fullname,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    };
    new Message(newMessage).save((err, message) => {
        if (err) {
            throw err;
        } else {
            Message.find({}).then(message => {
                if (message) {
                    res.render("newmessage", {
                        tittle: "Sent",
                        messages: message
                    });
                } else {
                    res.render("noMessage", {
                        title: "Not found"
                    });
                }
            });
        }
    });
});
app.use(
    searchfriends);

/////////message

app.get("/chat", (req, res) => {

    res.render("chatbox");
});
// create server's connection listener to run, and this occurs for every new socket connection
io.on("connection", function (socket) {
    console.log("Connected!");

    socket.on("new_user", function (data) {
        users[socket.id] = {
            name: data.name
        };
        console.log(users[socket.id]);
        socket.emit('existing_messages', messages);
        io.emit("display_new_user", {
            name: data.name
        })
    });
    socket.on("new_message", function (data) {
        messages[id] = {
            name: data.name,
            message: data.message
        };
        io.emit("update_messages", messages[id]);
        id++;
    })
    socket.on("disconnect", function () {
        io.emit("user_disconnect", users[socket.id])
    })
})