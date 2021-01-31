
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// const sequelize = require('./src/models/user.model').sequelize
const model = require("./src/models/index")
const User = model.user;
const Leave = model.leave;

//Create an instance of express
const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json("Welcome to Leave Management System");
});

//Require Users routes
let userRoutes = require("./src/routes/user.route");
userRoutes(app);
//Require Leaves routes
let leaveRoutes = require("./src/routes/leave.route");
leaveRoutes(app);



//To re-initialize the databse on every server start up
const eraseDatabaseOnSync = true;
const port = process.env.PORT || 8080;
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
model.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  initial()
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
});

// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
//   });
// });
const moment = require("moment-timezone");
const date = moment().tz("Africa/Lagos").format("MMM D YYYY");
function initial() {
  User.create({
    email:"admin@test.com",
    password:"password",
    staff_id:"admin",
    type:"admin",
    firstName:"Ridwan",
    lastName:"Balogun",
    line_manager:"Nobody",
  });
  User.create({
    email:"test2@test.com",
    password:"1234567890",
    staff_id:"test2",
    type:"admin",
    firstName:"Ridwan2",
    lastName:"Balogun2",
    line_manager:"Nobody2",
  });
  Leave.create({
    firstName:"Ridwan",
    lastName:"Balogun",
    staff_id:"ridwan",
    email:"balogunridwan@gmail.com",
    type:"School",
    status:"approved",
    date_requested: "2021-01-29",
    date_approved:"2021-01-29",
    initial_leave:"2021-01-29",
    balance_leave:304,
    leave_start:"2021-01-29",
    leave_end:"2021-01-29",
    resumption:"2021-01-29"
  });
  Leave.create({
    firstName:"Admin",
    lastName:"Test",
    email:"admin@gmail.com",
    type:"annual",
    status:"accepted",
    date_requested: "2021-01-29",
    date_approved:"2021-01-29",
    initial_leave:"2021-01-29",
    leave_start:"2021-01-29",
    leave_end:"2021-01-29",
    resumption:"2021-01-29"
  });
}