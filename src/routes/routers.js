const express = require("express");
const path = require("path");
// const fs = require('fs');
const authMiddleware = require("../middleware/authMiddleware");
const uploadSingle = require("../storage/SingleFile");
const uploadMulti = require("../storage/MultiFile");
const router = express.Router();
const multer = require("multer");
const {
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const {
  getListProduk,
  createProduk,
  getDetailProdukById,
  getDetailProdukByParams,
} = require("../controllers/produkController");
const validationResultMiddleware = require("../middleware/validationResultMiddleware");
const userValidator = require("../validators/userValidator");
const produkValidator = require("../validators/produkValidator");
const { register } = require("../controllers/AuthController");


//Register
router.post("/register",register)


//Update user
router.put(
  "/user/update/:id",
  userValidator.updateUserValidator,
  validationResultMiddleware,
  updateUser,
);
// delete User
router.delete("/user/delete/:id",deleteUser)

//user
router.get(
  "/user/list",
  getListUser
);
router.post(
  "/user/create",
  userValidator.createUserValidator,
  validationResultMiddleware,
  createUser
);
//getUserById
router.get("/user/detail/:id", getDetailUserById);
router.get("/user/list/:email", getDetailUserByParams);

//produk
router.get("/produk/listProduk", getListProduk);
router.post(
  "/produk/create",
  produkValidator.createProdValidator,
  validationResultMiddleware,
  createProduk
);
//getUserById
router.get("/produk/detail/:id", getDetailProdukById);
router.get("/produk/detail/:namaProduk", getDetailProdukByParams);

//
module.exports = router;
