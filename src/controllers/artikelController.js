const artikel = require("../models/artikel");
const { Op, where } = require("sequelize");
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

async function createArtikelBulk(req, res) {
  try {
    const payload = req.body.payload;
    payload.map((item, index) => {
      item.userId = req.id;
    });
    await artikelModel.bulkCreate(payload);
    // const {payload} = req.body;
    res.status(201).json({
      status: "success",
      msg: "create artikelBulk berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}
async function createArtikelMulti(req, res) {
  try {
    let { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;

    await Promise.all(
      payload.map(async (item, index) => {
        try {
          await artikelModel.create({
            title: item.title,
            year: item.year,
            description: item.description,
            userId: req.id,
          });

          success = success + 1;
        } catch (err) {
          fail = fail + 1;
        }
      })
    );

    res.status(201).json({
      status: "201",
      msg: `sukses menambahkan ${success} artikel dari total ${jumlah} artikel dan gagal ${fail} artikel`,
    });
  } catch (err) {
    res.status(403).json({
      status: "error",
      msg: "error creating",
    });
  }
}

// async function getListArtikel(req, res) {
//   try {
//     const artikel = await artikelModel.findAll({
//       where :{
//         userId: req.id
//       }
//     })
//     res.json({
//       status: "Success",
//       message: "Data Produk Ditemukan",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({
//       status: "Fail",
//       maessage: "Terjadi Kesalahan",
//     });
//   }
// }

async function getListArtikel(req, res) {
  const {
    keyword,
    page,
    pageSize,
    year,
    offset,
    sortBy = "id",
    orderBy = "asc",
  } = req.query;
  try {
    const artikel = await artikelModel.findAndCountAll({
      attributes: {
        exclude: ["createAt", "updateAt"],
      },
      // where: {
      //   [Op.or]: [
      //     {
      //       title: {
      //         [Op.substring] : keyword,
      //       },
      //     },
      //     {
      //       description: {
      //         [Op.substring] : keyword,
      //       },
      //     },
      //   ],
      //   year: {
      //     [Op.gte] : year,
      //   },
      // },
      order: [[sortBy, orderBy]],
      limit: pageSize,
      offset: offset, // offset bukanlah page
    });
    res.json({
      status: "Success",
      message: "Data Artikel Ditemukan",
      pageNation: {
        currentPage: page,
        pageSize: pageSize,
        totalData: artikel.count,
      },
      data: artikel,

      query: {
        // title,
        // dari_tahun,
        // sampai_tahun,
        page,
        pageSize,
      },
    });
  } catch (err) {
    console.log("ada kesalahan masbro =>", err);
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}

// async function getListArtikel(req, res) {
//   const { title, dari_tahun, sampai_tahun } = req.query;
//   try {
//     const artikel = await artikelModel.findAll({
//       attributes: {
//         exclude: ["createAt", "updateAt"],
//       },
//       where: {
//         title: {
//           [Op.substring]: title,
//         },
//         year: {
//           [Op.between]: [dari_tahun, sampai_tahun],
//         },
//       },
//     });
//     res.json({
//       status: "Success",
//       message: "Data Produk Ditemukan",
//       data: artikel,
//       query: {
//         title,
//         dari_tahun,
//         sampai_tahun,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({
//       status: "Fail",
//       maessage: "Terjadi Kesalahan",
//     });
//   }
// }
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
async function deleteMulti(req, res) {
  try {
    const { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (items, index) => {
        try {
          const title = await artikelModel.findOne({
            where: { id: items.id },
          });
          console.log(title.userId);
          if (title.userId !== req.id) {
            // return res.json({
            //   status: "Fail",
            //   msg: `You can't delete the article`,
            // });
            return (fail = fail + 1);
          }
          await artikelModel.destroy({
            where: { id: items.id },
          });
          console.log(items.id);
          console.log(title);
          success = success + 1;
        } catch (error) {
          console.log(error);
          // fail = fail + 1;
        }
      })
    );
    res.status(200).json({
      status: "Success",
      msg: `Success delete ${success} articles from ${jumlah} articles with ${fail} fail`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      msg: "Something went wrong",
      err: error,
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
  createArtikelBulk,
  createArtikelMulti,
  createArtikel,
  getListArtikel,
  updateArtikel,
  deleteArtikel,
  deleteMulti,
};
