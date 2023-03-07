"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tanggapans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_pengaduan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tgl_tanggapan: {
        type: Sequelize.DATE,
      },
      tanggapan: {
        type: Sequelize.TEXT,
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "petugas",
          key: "id",
          as: "id_petugas",
        },
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
    await queryInterface.dropTable("tanggapans");
  },
};
