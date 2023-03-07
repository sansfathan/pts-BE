const UserModel = require("../models").user;
// const ForgotPasswordModel = require("../models").password;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailHandle = require("../mail");
const crypto = require("crypto");
const dayjs = require("dayjs");
require("dotenv").config();

async function register(req, res) {
  try {
    let payload = req.body;
    let {nik, nama, password, role, telp } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);

    await UserModel.create({
      nik,
      nama,
      password: hashPassword,
      role,
      telp
    });
    if (nama === null) {
      return res.status(422).json({
        status: "Fail",
        msg: "nama kosong Silakan di isi",
      });
    }
    res.json({
      status: "Success",
      msg: "Register Berhasil",
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err,
    });
  }
}

async function login(req, res) {
  try {
    let payload = req.body;
    let { nama, password } = payload;
    const user = await UserModel.findOne({
      where: {
        nama: nama,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: 422,
        msg: "nama tidak ditemukan silahkan register",
      });
    }
    if (password === null) {
      return res.status(422).json({
        status: 422,
        msg: "nama & Password tidak dicocok",
      });
    }

    const verify = await bcrypt.compareSync(password, user.password);

    if (verify === false) {
      return res.status(422).json({
        status: "Fail",
        msg: "nama dan Password Tidak Cocok",
      });
    }

    const token = jwt.sign(
      {
        id: user?.id,
        role: user?.role,
        nama: user?.nama,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      status: "Success",
      msg: "Login Berhasil",
      user: user,
      token,
    });
  } catch (err) {
    console.log(err)
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err,
    });
  }
}

module.exports = { register, login };
