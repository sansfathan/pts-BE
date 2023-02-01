const { check } = require("express-validator");
const UserModel = require("../models").user;

const createUserValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib Di Isi !!!"),
  check("email")
    .isEmail()
    .withMessage("Gunakan Format Email")
    .custom((value) => {
      return UserModel.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("E-mail Sudah di pakai");
        }
      });
    }),
];
const updateUserValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib Di Isi !!!"),
];
const updatePassword = [
  check("new_Password").isLength({
    min : 8,
  }).withMessage("password Min 8 karakter")

]
module.exports = { createUserValidator, updateUserValidator, updatePassword};
