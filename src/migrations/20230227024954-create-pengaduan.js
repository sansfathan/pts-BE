'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengaduans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_pengaduan: {
        type: Sequelize.DATE,
        allowNull : false
      },
      nik: {
        type: Sequelize.CHAR(16),
        references : {
          model : "masyrakats",
          key : "nik",
          as : "nik"
        }
      },
      isi_laporan: {
        type: Sequelize.TEXT
      },
      foto: {
        type: Sequelize.STRING(255)
      },
      status: {
        type: Sequelize.ENUM,
        allowNull :false,
        values : ["0","proses","selesai"]
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
    await queryInterface.dropTable('pengaduans');
  }
};