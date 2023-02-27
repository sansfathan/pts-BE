'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('petugas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaPetugas: {
        type: Sequelize.STRING(35)
      },
      username: {
        type: Sequelize.STRING(25)
      },
      password: {
        type: Sequelize.STRING(32)
      },
      telp: {
        type: Sequelize.STRING(13)
      },
      level: {
        type: Sequelize.ENUM,
        allowNull :false,
        values : ["administrator","petugas"]
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('petugas');
  }
};