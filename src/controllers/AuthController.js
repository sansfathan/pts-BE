const UserModel = require("../models").user;

async function register(req,res) {
  try {
    res.json({
      status: "Success",
      msg: "Register Berhasil",
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

module.exports = {register}