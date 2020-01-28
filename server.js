const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportFacebook = require('passport-facebook');


//Load models
const Message = require('./models/messages.js');
const User = require('./models/user');
const app = express();

//load keys file
const Keys = require('./config/keys');

//use body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//configuration for authentication
app.use(cookieParser());
app.use(session({
    secret: 'hooplahMedoozalah',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//load facebook strategy
require('./passport/facebook');
//connect to mLab MongoDB
mongoose.connect(Keys.MongoDB, {
    useNewUrlParser: true
}).then(() => {
    console.log('Server is conncted to MongoDB');
}).catch((err) => {
    console.log(err);
})

// environment variable for port
const port = process.env.PORT || 3000;
//set up view engine 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});