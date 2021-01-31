const Leave = require("../models/index").leave;
const User = require("../models/index").user;
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const config = require("../config/auth.config");

// Save a new Leave

exports.createLeave = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "Please pass requests" });
  } else {

    try {
      const {
        days,
        type,
        date_requested,
        leave_start,
        leave_end,
        resumption,
      } = req.body;
      const email = req.email
      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      
      if (type == "annual" && findUser.annualLeave >= days) {
        const initial_balance = findUser.annualLeave
        const balance = initial_balance- days;
        await User.update(
          { annualLeave: balance },
          { where: { email: email } }
        );
        const createLeave = await Leave.create({
          staff_id: findUser.staff_id,
          email,
          type,
          days,
          date_requested,
          status:"Pending",
          leave_start,
          leave_end,
          resumption,
          initial_balance: initial_balance,
          final_balance: balance
        });
        return res.status(201).json({
          message: "Leave successfully requested!",
          data: createLeave,
          
          "Annual leave balance": balance,
        });
      } else if (type == "exam" && findUser.examLeave >= days) {
        const initial_balance = findUser.examLeave
        const balance = initial_balance- days;
        await User.update({ examLeave: balance }, { where: { email: email } });
        const createLeave = await Leave.create({
          email,
          type,
          days,
          date_requested,
          leave_start,
          leave_end,
          resumption,
          initial_balance: initial_balance,
          final_balance: balance
        });
        return res.status(201).json({
          message: "Leave successfully requested!",
          data: createLeave,
          "Exam leave balance": balance,
        });
      } else if (type == "sick" && findUser.sickLeave >= days) {
        const initial_balance = findUser.sickLeave
        const balance = initial_balance- days;
        await User.update({ sickLeave: balance }, { where: { email: email } });
        const createLeave = await Leave.create({
          email,
          type,
          days,
          date_requested,
          leave_start,
          leave_end,
          resumption,
          initial_balance: initial_balance,
          final_balance: balance
        });
        return res.status(201).json({
          message: "Leave successfully requested!",
          data: createLeave,
          "Sick leave balance": balance,
        });
      } else {
        return res.status(400).json({
          message: `The number of days have exceed the balance you have for ${type} leave`,
        });
      }
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
exports.getAllLeavesOneUser = async (req, res) => {
  const email = req.email
  try {
    // const allLeaves = await Leave.findAll({ raw: true });
    const  allLeaves = await Leave.findAll({
      where: {
        email: email,
      },
    });
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
    const email = req.email;
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
  const { firstName} = req.body;
  const email = req.email
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
  const email = req.email;
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
