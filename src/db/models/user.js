'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.LauncherInfos, {
        foreignKey: 'user_uuid'
      });

      User.hasOne(models.Picture, {
        foreignKey: 'user_uuid'
      });
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'Basic description'
    },
    phone_number: DataTypes.STRING,
    birthday: DataTypes.DATE,
    rankId: DataTypes.UUID,
    country_code: DataTypes.STRING,
    discord_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};