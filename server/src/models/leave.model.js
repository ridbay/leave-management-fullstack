module.exports = (sequelize, Sequelize) => {
  const Leave = sequelize.define("leave", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    date_requested: {
      type: Sequelize.DATEONLY,
    },
    date_approved: {
      type: Sequelize.DATEONLY,
    },
    initial_leave: {
      type: Sequelize.DATEONLY,
    },
    balance_leave: {
      type: Sequelize.INTEGER,
    },

    leave_start: {
      type: Sequelize.DATEONLY,
    },

    leave_end: {
      type: Sequelize.DATEONLY,
    },

    resumption: {
      type: Sequelize.DATEONLY,
    },
  });

  return Leave;
};
