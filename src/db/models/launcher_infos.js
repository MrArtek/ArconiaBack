'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LauncherInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LauncherInfos.belongsTo(models.User, {
          foreignKey: 'user_uuid'
      })
    }
  };
  LauncherInfos.init({
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    user_uuid: DataTypes.UUID,
    last_login: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'LauncherInfos',
    tableName: 'launcher_infos'
  });
  return LauncherInfos;
};