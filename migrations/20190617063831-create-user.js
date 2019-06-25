'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      firstname: {
        type: Sequelize.STRING,
        notEmpty: true
      },

      lastname: {
        type: Sequelize.STRING,
        notEmpty: true
      },

      username: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      last_login: {
        type: Sequelize.DATE
      },
      imageName: {
        type: Sequelize.STRING,
        defaultValue: 'none'
      },
      imageData: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
