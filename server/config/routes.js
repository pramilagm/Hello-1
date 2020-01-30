const helloController = require("../controllers/users");
module.exports = function (app) {

  app.get("/home", helloController.homePage);
  app.get("/", helloController.loginRegistration);

  app.get("/about", helloController.aboutPage);

  app.get("/contact", helloController.contactPage);
  app.post("/contactUs", helloController.postContact);
  app.get("/user/:_id", helloController.show_user);

  app.get("/profile", helloController.profilePage);
  app.get("/chatbox", helloController.messageBox);

  app.get("/logout", helloController.logout);
  app.get("/auth/facebook", helloController.facebookAuth);
  app.get("/auth/facebook/callback", helloController.AuthenticateUser);

};