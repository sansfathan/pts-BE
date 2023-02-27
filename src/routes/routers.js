const express = require("express");
const path = require("path");
// const fs = require('fs');
const authMiddleware = require("../middleware/authMiddleware");
const uploadSingle = require("../storage/SingleFile");
const uploadMulti = require("../storage/MultiFile");
const router = express.Router();
const multer = require("multer");

const validationResultMiddleware = require("../middleware/validationResultMiddleware");
const userValidator = require("../validators/userValidator");
const produkValidator = require("../validators/produkValidator");
const { register, login, forgotPassword, resetPassword } = require("../controllers/AuthController");
const jwtValidateMidlleWare = require("../middleware/jwtValidateMidlleware");
const {
  createArtikel,
  getListArtikel,
  updateArtikel,
  deleteArtikel,
  createArtikelBulk,
  createArtikelMulti,
  deleteArtikelmulti,
  deleteMulti,
} = require("../controllers/artikelController");


//Register
router.post("/register", register);
//login
router.post("/login", login);
//lupa password
router.post("/lupa-password", forgotPassword)
//reset pasword
router.post("/reset-password/:userId/:token", resetPassword)

router.use(jwtValidateMidlleWare);

//Update user
// router.put(
//   "/user/update/:id",
//   userValidator.updateUserValidator,
//   validationResultMiddleware,
//   updateUser
// );
//Update Password User
// router.put(
//   "/user/update-password",
//   userValidator.updatePassword,
//   validationResultMiddleware,
//   updatePassword
// );
// // delete User
// router.delete("/user/delete/:id", deleteUser);

// //user
// router.get("/user/list", getListUser);
// router.post(
//   "/user/create",
//   userValidator.createUserValidator,
//   validationResultMiddleware,
//   createUser
// );
// //getUserById
// router.get("/user/detail/:id", getDetailUserById);
// router.get("/user/list/:email", getDetailUserByParams);

// //produk
// router.get("/produk/listProduk", getListProduk);
// router.post(
//   "/produk/create",
//   produkValidator.createProdValidator,
//   validationResultMiddleware,
//   createProduk
// );
// //getUserById
// router.get("/produk/detail/:id", getDetailProdukById);
// router.get("/produk/detail/:namaProduk", getDetailProdukByParams);
// //artikel
// router.post("/artikel/create", createArtikel);
// router.post("/artikel/createBulk", createArtikelBulk);
// router.post("/artikel/createMulti", createArtikelMulti);
// router.get("/artikel/list", getListArtikel);
// router.put("/artikel/update/:id", updateArtikel);
// router.delete("/artikel/delete/:id", deleteArtikel);
// router.delete("/artikel/delete-mullti/", deleteMulti);
//
module.exports = router;
