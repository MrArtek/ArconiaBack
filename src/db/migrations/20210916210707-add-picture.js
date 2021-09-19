'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('picture', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true
      },
      user_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'uuid'
        },
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING
      },
      md5_sum: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      file_size: {
        allowNull: false,
        type: Sequelize.INTEGER
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('picture');
  }
};
