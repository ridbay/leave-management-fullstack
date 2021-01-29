const Leave = require("../models/index").leave;
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const config = require("../config/auth.config");

// Save a new Leave

exports.createLeave = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "Please pass requests" });
  } else {
    try {
      //   const { type, status,date_requested,date_approved,initial_leave,balance_leave,leave_start, leave_end,resumption} = req.body;
      const {
        type,
        date_requested,
        leave_start,
        leave_end,
        resumption,
      } = req.body;
      const createLeave = await Leave.create({
        type,
        date_requested,
        leave_start,
        leave_end,
        resumption,
      });

      return res.status(201).json({
        message: "Leave successfully registered!",
        data: createLeave,
      });
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong",
        data: error,
      });
    }
  }
};



exports.getAllLeaves = async (req, res) => {
  try {
    const allLeaves = await Leave.findAll({ raw: true });
    res.json({
      data: allLeaves,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};

exports.getOneLeave = async (req, res) => {
  try {
    const { email } = req.body;
    const findLeave = await Leave.findOne({ where: { email: email } });
    res.json({
      data: findLeave,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};
exports.updateLeave = async (req, res) => {
  const { firstName, email } = req.body;
  try {
    const updateLeave = await Leave.update(
      { firstName: firstName },
      { where: { email: email } }
    );

    res.json({
      message: `Leave data updated`,
      data: updateLeave,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};

exports.deleteLeave = async (req, res) => {
  const { email } = req.body;
  try {
    const deleteLeave = await Leave.destroy({
      where: {
        email: email,
      },
    });
    const allLeaves = await Leave.findAll();
    res.json({
      message: `Leave data with email: ${email} successfully deleted`,
      data: allLeaves,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};
