const Sequelize = require('sequelize');
const config = require('./config');
// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect:
      config.development
        .dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/user')(sequelize, Sequelize);
module.exports = db;
