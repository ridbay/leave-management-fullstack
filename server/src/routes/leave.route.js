const leave = require("../controllers/leave.controller");
const verifyJWT = require("../middlewares/authJwt")
module.exports = (app) => {
  app.post("/leave/createLeave",verifyJWT,leave.createLeave);
  app.get("/leave/allLeaves", leave.getAllLeaves);
  app.get("/leave/allLeavesOneUser",verifyJWT, leave.getAllLeavesOneUser);
  app.get("/leave/OneLeave", leave.getOneLeave);
  app.put("/leave/OneLeave",verifyJWT, leave.updateLeave);
  app.delete("/leave/OneLeave", leave.deleteLeave);
};
