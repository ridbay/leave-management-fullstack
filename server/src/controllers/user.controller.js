const User = require("../models/index").user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

// Sign up and Save a new User

exports.signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ msg: "Please pass email and password." });
  } else {
    try {
      const { firstName, lastName, staff_id, email, password, type } = req.body;
      const findUser = await User.findOne({ where: { email: email } });
      if (findUser) {
        res.status(400).send({
          message: "Failed! User already exist!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        staff_id: staff_id,
        type: type,
      });

      return res.status(201).json({
        message: "User successfully registered!",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong",
        data: error,
      });
    }
  }
};

// Sign in an existing User
exports.signin = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ msg: "Please pass email and password." });
  } else {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user)
        return res.status(400).json({
          message: "Authentication failed. User not found.",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Login Credentials!",
        });
      let token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).json({
        token: token,
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error",
        data: error,
      });
    }
  }
};

//
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({ raw: true });
    res.json({
      data: allUsers,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    res.json({
      data: findUser,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};
exports.updateUser = async (req, res) => {
  const { firstName, email } = req.body;
  try {
    const updateUser = await User.update(
      { firstName: firstName },
      { where: { email: email } }
    );

    res.json({
      message: `User data updated`,
      data: updateUser,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const deleteUse = await User.destroy({
      where: {
        email: email,
      },
    });
    const allUsers = await User.findAll();
    res.json({
      message: `User data with email: ${email} successfully deleted`,
      data: allUsers,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};
