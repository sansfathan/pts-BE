// const { use } = require("../routes/routers");

const UserModel = require("../models").user;

async function getListUser(req, res) {
  try {
    const users = await UserModel.findAll();
    res.json({
      status: "Success",
      msg: "Data user Di temukan",
      data: users,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

//create data ke database

async function createUser(req, res) {
  try {
    const payload = req.body;
    const { nama, email, tempatLahir, tanggalLahir } = payload;
    await UserModel.create({
      nama: nama,
      email: email,
      isActive: true,
      tempatLahir: tempatLahir,
      tanggallahir: tanggalLahir,
    });
    res.status(201).json({
      status: "Success",
      msg: "Berhasil Disimpan",
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function getDetailUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User tidak Ditemukan",
      });
    }
    res.json({
      status: "success",
      msg: "User Berhasil",
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

async function getDetailUserByParams(req, res) {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({
      where: {
        tempatLahir: email,
      },
    });
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User tidak Ditemukan",
      });
    }
    res.json({
      status: "success",
      msg: "User Berhasil ditemukan",
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    const payload = req.body;
    const { nama, tempatLahir, tanggalLahir } = payload;
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User tidak Ditemukan",
        id: id,
        user: user,
      });
    }

    // await UserModel.update(
    //   {
    //     nama : nama,
    //     tempatLahir : tempatLahir,
    //     tanggalLahir : tanggalLahir,
    //   },
    //   {
    //     where: {
    //       id: id,
    //     },
    //   }
    // );

    await UserModel.update(
      {
        nama,
        tempatLahir,
        tanggalLahir,
      },
      {
        where: {
          id: id,
        },
      }
    );

   
    res.json({
      status: "success",
      msg: "Update User Berhasil",
      id: id,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    const payload = req.body;
    
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User tidak Ditemukan",
        id: id,
        user: user,
      });
    }

    // await UserModel.update(
    //   {
    //     nama : nama,
    //     tempatLahir : tempatLahir,
    //     tanggalLahir : tanggalLahir,
    //   },
    //   {
    //     where: {
    //       id: id,
    //     },
    //   }
    // );

    await UserModel.destroy(
      {
        where: {
          id: id,
        },
      }
    );

   
    res.json({
      status: "success",
      msg: "Delete User Berhasil",
      id: id,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}


// async function deleteUser(req, res) {
//   try {
//     const {id} = req.params
//     const user = await UserModel.findByPk(id);
//     if (user === null) {
//       return res.status(404).json({
//         status: "Fail",
//         msg: "User tidak Ditemukan",
//       });
//     }
//     await UserModel.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.json({
//       status: "success",
//       msg: "berhasil di hapus",
//     });
//   } catch (err) {
//     res.status(403).json({
//       status: "Fail",
//       msg: "Ada Kesalahan",
//       err : err
//     });
//   }
// }

module.exports = {
  updateUser,
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  deleteUser,
};
