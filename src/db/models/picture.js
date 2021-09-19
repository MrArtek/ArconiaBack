'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Picture.belongsTo(models.User, {
            foreignKey: 'user_uuid'
        })
    }
  };
  Picture.init({
    uuid: DataTypes.UUID,
    user_uuid: DataTypes.UUID,
    url: DataTypes.STRING,
    filename: DataTypes.STRING,
    md5_sum: DataTypes.STRING,
    content_type: DataTypes.STRING,
    file_size: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Picture',
    tableName: 'picture'
  });
  return Picture;
};