const UserModel = require("../models").user;
const ForgotPasswordModel = require("../models").forgotPassword;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailHandle = require("../mail");
require("dotenv").config();

async function register(req, res) {
  try {
    const payload = req.body;
    const { nama, email, password } = payload;

    let hashPassword = await bcrypt.hashSync(password, 10);

    await UserModel.create({
      nama,
      email,
      password: hashPassword,
    });
    res.json({
      status: "Success",
      msg: "Register Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function login(req, res) {
  try {
    const payload = req.body;
    const { email, password } = payload;

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (user === null) {
      return res.status(422).json({
        status: "Fail",
        msg: "Email Tidak ditemukan, Silahkan Register",
      });
    }

    if (password === null) {
      return res.status(422).json({
        status: "Fail",
        msg: "Email dan Password Tidak Cocok",
      });
    }

    const verify = await bcrypt.compareSync(password, user.password);

    if (verify === false) {
      return res.status(422).json({
        status: "Fail",
        msg: "Email dan Password Tidak Cocok",
      });
    }

    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
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
      token: token,
      user: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    //cek apakah user dengan email tsb terdaftar
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    //jika tidak terdaftar berikan response dengan msg email tidak terdaftar
    if (user === null) {
      res.status(422).json({
        status: "Fail",
        msg: "Email Tidak ditemukan, silahkan gunakan email yg terdaftar",
      });
    }
    // cek apakah token sudah pernah dibuat pada user tsb di table forgot password
    const currentToken = await ForgotPasswordModel.findOne({
      where: {
        userId: user.id,
      },
    });
    // sudah hapus
    if (currentToken !== null) {
      await ForgotPasswordModel.destroy({
        where: {
          userId: user.id,
        },
      });
    }
    // jika belum buat token

    const context = {
      link: "https://www.youtube.com/",
    };
    const sendMail = await sendEmailHandle(
      email,
      "lupa password",
      "lupaPassword",
      context
    );
    if (sendMail === "success") {
      res.json({
        status: "Success",
        msg: "silahkan cek email",
      });
    } else {
      res.status(403).json({
        status: "Fail",
        msg: "Gunakan email yg terdaftar",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      msg: "ada kesalahan",
    });
  }
}

module.exports = { register, login, forgotPassword };
