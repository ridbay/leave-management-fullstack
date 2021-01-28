const Sequelize = require("sequelize");
const config = require("../config/db.config");

const sequelize = new Sequelize(config.DB_NAME, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.leave = require("../models/leave.model")(sequelize, Sequelize);

module.exports = db;
