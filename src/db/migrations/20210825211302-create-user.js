'use strict';

const rank = require("../models/rank");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(16)
      },
      description: {
        allowNull: true,
        defaultValue: 'Basic description',
        type: Sequelize.TEXT
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING(16)
      },
      birthday: {
        allowNull: true,
        type: Sequelize.DATE
      },
      rankId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      country_code: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      discord_id: {
        allowNull: true,
        type: Sequelize.STRING(32)
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
    await queryInterface.dropTable('user');
  }
};