'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      firstname: {
        type: DataTypes.STRING,
        notEmpty: true
      },

      lastname: {
        type: DataTypes.STRING,
        notEmpty: true
      },

      username: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      last_login: {
        type: DataTypes.DATE
      },
      imageName: {
        type: String,
        default: 'none',
        required: true
      },
      imageData: {
        type: String,
        required: true
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
