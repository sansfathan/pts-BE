"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("produks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaProduk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jumlahBarangTerjual: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE ",
        onUpdate: "CASCADE",
        references: {
          model: "users", //nama tabel
          key: "id", //di relasikan
          as: "userId", // tabel ini yg di relasikan
        },
      },
      stok: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("produks");
  },
};
