const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportFacebook = require("passport-facebook");
// var getSign = require('horoscope').getSign;
// var getZodiac = require('horoscope').getZodiac;

const app = express();

//load keys file
const Keys = require("./config/keys");
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
// console.log(horoscope.getZodiac(2015))

app.use(passport.initialize());
app.use(passport.session());

//load facebook strategy
require("./passport/facebook");
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
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// for message socket to work
const io = require("socket.io")(server);
var users = {};
var id = 0;
var messages = {};
io.on("connection", function (socket) {
  console.log("Connected!");

  socket.on("new_user", function (data) {
    users[socket.id] = {
      name: data.name
    };
    console.log(users[socket.id]);
    socket.emit("existing_messages", messages);
    io.emit("display_new_user", {
      name: data.name
    });
  });
  socket.on("new_message", function (data) {
    messages[id] = {
      name: data.name,
      message: data.message
    };
    io.emit("update_messages", messages[id]);
    id++;
  });
  socket.on("disconnect", function () {
    io.emit("user_disconnect", users[socket.id]);
  });
});
//end of socket

app.set("view engine", "handlebars");
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);