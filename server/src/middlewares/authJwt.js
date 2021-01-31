const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const model= require("../models/index");
const User = model.user

module.exports = (req, res, next) => {

  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
const token = authHeader.split(" ")[1];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.email= decoded.email;
    next();
  });
};
