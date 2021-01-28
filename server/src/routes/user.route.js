const user = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/signup", user.signup);
  app.post("/signin", user.signin);
};
