"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pengaduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pengaduan.init(
    {
      tgl_pengaduan: DataTypes.DATE,
      nik_pengaduan: DataTypes.INTEGER,
      isi_laporan: DataTypes.TEXT,
      foto: DataTypes.STRING,
      status: DataTypes.ENUM("0", "proses", "selesai"),
    },
    {
      sequelize,
      modelName: "pengaduan",
    }
  );
  return pengaduan;
};
