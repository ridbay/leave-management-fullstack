module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staff_id:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
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
      defaultValue:"Ridwan"
    },
    sickLeave: {
      type: Sequelize.INTEGER,
      defaultValue:10
    },
    examLeave: {
      type: Sequelize.INTEGER,
      defaultValue:5
    },
    annualLeave: {
      type: Sequelize.INTEGER,
      defaultValue:20
    },
  });
  
  return User;
};
