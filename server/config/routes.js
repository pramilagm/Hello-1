const routers = require("../controllers/hellos");
module.exports = function (app) {
    app.get("/", helloController.homePage);

    app.get("/about", helloController.aboutPage);

    app.get("/contact", helloController.contactPage);

    app.get("/profile", helloController.profilePage);

    app.get("/logout", helloController.logout);
};