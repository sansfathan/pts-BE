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

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");
const jwtValidateMidlleWare = require("../middleware/jwtValidateMidlleware");

//Register
router.post("/register", register);
//login
router.post("/login", login);


router.use(jwtValidateMidlleWare);

module.exports = router;
