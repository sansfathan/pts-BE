"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("masyarakats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nik_masyarakats: {
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING(35),
      },
      username: {
        type: Sequelize.STRING(25),
      },
      password: {
        type: Sequelize.STRING(32),
      },
      telp: {
        type: Sequelize.STRING(13),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("masyarakats");
  },
};
