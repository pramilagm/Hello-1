const helloController = require("../controllers/users");
module.exports = function (app) {
    app.get("/", helloController.homePage);

    app.get("/about", helloController.aboutPage);

    app.get("/contact", helloController.contactPage)
    app.post('/contactUs', helloController.postContact)

    app.get("/profile", helloController.profilePage);

    app.get("/logout", helloController.logout);
    app.get('/auth/facebook', helloController.facebookAuth);
    app.get('/auth/facebook/callback', helloController.AuthenticateUser);
}