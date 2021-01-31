module.exports = (sequelize, Sequelize) => {
  const Leave = sequelize.define("leave", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staff_id: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    date_requested: {
      type: Sequelize.STRING,
    },
    date_approved: {
      type: Sequelize.STRING,
    },
    days: {
      type: Sequelize.STRING,
    },
    initial_balance: {
      type: Sequelize.STRING,
    },
    final_balance: {
      type: Sequelize.STRING,
    },
    leave_start: {
      type: Sequelize.STRING,
    },

    leave_end: {
      type: Sequelize.STRING,
    },

    resumption: {
      type: Sequelize.STRING,
    },
  });

  return Leave;
};
