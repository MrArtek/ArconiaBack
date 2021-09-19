'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('launcher_infos', {
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
      last_login: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('launcher_infos');
  }
};
