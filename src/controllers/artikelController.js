const artikel = require("../models/artikel");

const artikelModel = require("../models").artikel;

async function createArtikel(req, res) {
  try {
    const payload = req.body;

    const { title, year, description } = payload;

    await artikelModel.create({
      title,
      year,
      description,
      userId: req.id,
    });

    res.status(201).json({
      status: "success",
      msg: "create artikel berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

async function getListArtikel(req, res) {
  try {
    const artikel = await artikelModel.findAll({
      where: {
        userid: req.id,
      },
    });
    res.json({
      status: "Success",
      message: "Data Produk Ditemukan",
      data: artikel,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}
async function updateArtikel(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { title, year, description } = payload;
    const artikel = await artikelModel.findByPk(id);
    if (artikel === null) {
      return res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    if (artikel.userId != req.id) {
      return res.status(422).json({
        status: "Fail",
        message: "artikel is not belong to you, you can't update it",
      });
    }
    await artikelModel.update(
      {
        title,
        year,
        description,
      },
      {
        where: {
          userId: req.id,
          id: id,
        },
      }
    );
    res.json({
      status: "Success",
      message: "Updated",
      // data: artikel,
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function deleteArtikel(req, res) {
  try {
    const { id } = req.params;
    const artikel = await artikelModel.findByPk(id);
    if (artikel === null) {
      res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    if (artikel.userId != req.id) {
      return res.status(422).json({
        status: "Fail",
        message: "artikel is not belong to you, you can't delete it",
      });
    }
    await artikelModel.destroy({
      where: {
        userId: req.id,
        id: id,
      },
    });
    res.json({
      status: "Success",
      message: "artikel dihapus",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}
module.exports = {
  createArtikel,
  getListArtikel,
  updateArtikel,
  deleteArtikel,
};
