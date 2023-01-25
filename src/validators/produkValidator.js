const { check } = require("express-validator");
const produkModel = require("../models").produk

const createProdValidator = [
  check("namaProduk")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib Di Isi !!!"),
];
module.exports = { createProdValidator };
