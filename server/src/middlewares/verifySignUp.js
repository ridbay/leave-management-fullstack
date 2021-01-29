const model = require("../models/index");
const User = model.user

module.exports = (req, res, next) => {
  if (!req.body) {
    return res.json({
      message: "Pass a body request",
    });
  }
  // Staff ID
  User.findOne({
    where: {
      staff_id: req.body.staff_id,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Staff ID is already in use!",
      });
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
      }

      next();
    });
  });
};
