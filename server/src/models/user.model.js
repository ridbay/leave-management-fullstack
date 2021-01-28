module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    staff_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      // allowNull: false,
      defaultValue: "Ridwan",
    },
    lastName: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    line_manager: {
      type: Sequelize.STRING,
      // allowNull:false
    },
    leave_balances: {
      type: Sequelize.INTEGER,
    },
  });
  
  return User;
};
