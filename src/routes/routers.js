const express = require("express");
const path = require("path");
// const fs = require('fs');
const authMiddleware = require("../middleware/authMiddleware");
const uploadSingle = require("../storage/SingleFile");
const uploadMulti = require("../storage/MultiFile");
const router = express.Router();
const multer = require("multer");
const { getListUser } = require("../controllers/UserController");

//user
router.get("/user/list", getListUser)

module.exports = router;
