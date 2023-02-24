const produkModel = require("../models").produk

async function getListProduk(req,res){
    try {
        const produk = await produkModel.findAll()
        res.json({
            status: "success",
            msg : "Produk di temukan",
            data : produk
        })
    } catch (error) {
        res.status(403).json({
            status : "Fail",
            msg: "ada kesalahan",
            err: error
        })
    }
}

async function createProduk(req, res) {
    try {
      const payload = req.body;
      const { namaProduk, brand, jumlahBarangTerjual, harga, stok } = payload;
      await produkModel.create({
        namaProduk: namaProduk,
        brand: brand,
        jumlahBarangTerjual: jumlahBarangTerjual,
        harga: harga,
        stok: stok,
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
  
  async function getDetailProdukById(req, res) {
    try {
      const {id} = req.params
      const prod = await produkModel.findByPk(id)
      if(prod === null){
        res.status(404).json({
          status : "Fail",
          msg : "produk tidak Ditemukan"
        })
      }
      res.json({
        status: "success",
        msg: "produk Berhasil",
        data : prod 
      });
    } catch (err) {
      res.status(403).json({
        status: "Fail",
        msg: "Ada Kesalahan",
        err : err
      });
    }
  }
  
  async function getDetailProdukByParams(req, res) {
    try {
      const {brand} = req.params
      const prod = await produkModel.findOne({
        where : {
          brand : brand
        }
      })
      if(prod === null){
        res.status(404).json({
          status : "Fail",
          msg : "produk tidak Ditemukan"
        })
      }
      res.json({
        status: "success",
        msg: "produk Berhasil ditemukan",
        data : prod 
      });
    } catch (err) {
      res.status(403).json({
        status: "Fail",
        msg: "Ada Kesalahan",
        err : err
      });
    }
  }

  
module.exports = {getListProduk,createProduk,getDetailProdukById, getDetailProdukByParams}