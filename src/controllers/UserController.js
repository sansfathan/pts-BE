const { use } = require("../routes/routers");

const UserModel = require("../models").user;

async function getListUser(req, res) {
  try {
    const users = await UserModel.findAll();
    res.json({
        status : "Success",
        msg : "Data user Di temukan",
        data : users,
    })
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

module.exports = { getListUser };
