const user = require("../controllers/user.controller");
const verifyDuplicateStaffIdOrEmail = require("../middlewares/verifySignUp");
const verifyJWT = require("../middlewares/authJwt")
module.exports = (app) => {
  // app.post("/auth/signup",verifyDuplicateStaffIdOrEmail, user.signup);
  app.post("/auth/signup",user.signup);
  app.post("/auth/signin", user.signin);
  app.get("/auth/allUsers", user.getAllUsers);
  app.get("/auth/OneUser", verifyJWT, user.getOneUser);
  app.put("/auth/OneUser",verifyJWT, user.updateUser);
  app.delete("/auth/OneUser", user.deleteUser);
};
