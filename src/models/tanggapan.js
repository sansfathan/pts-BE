'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tanggapan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tanggapan.init({
    id_pengaduan: DataTypes.INTEGER,
    tgl_tanggapan: DataTypes.DATE,
    tanggapan: DataTypes.TEXT,
    id_petugas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tanggapan',
  });
  return tanggapan;
};