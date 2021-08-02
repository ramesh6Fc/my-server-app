const verifySignUp = require("../actions/user-validation");
const authConfig = require("../config/auth.config");
const verifyToken = require("../actions/jwt-auth.js")
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  //Sample URI
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
  });

  //User registration
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  //User Login
  app.post("/api/auth/signin", controller.signin);

  // Get some data only for JWT
  app.get("/api/user", [verifyToken.verifyToken], controller.welcome);
};