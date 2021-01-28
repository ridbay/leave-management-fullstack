
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// const sequelize = require('./src/models/user.model').sequelize
const db = require("./src/models/index")
const User = db.user;
const Leave = db.leave;

//Create an instance of express
const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json("Welcome to Getrates User");
});

//Require Users routes
let userRoutes = require("./src/routes/user.route");
userRoutes(app);


//To re-initialize the databse on every server start up
const eraseDatabaseOnSync = true;
const port = process.env.PORT || 8080;
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
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
    email:"test@test.com",
    password:"1234567890",
    type:"admin",
    firstName:"Ridwan",
    lastName:"Balogun",
    line_manager:"Nobody",
    leave_balance: "304"
  });
  Leave.create({
    email:"balogunridwan@gmail.com",
    type:"School",
    status:"approved",
    date_requested:date,
    date_approved:date,
    initial_leave:date,
    balance_leave:304,
    leave_start:date,
    leave_end:date,
    resumption:date
  });
}