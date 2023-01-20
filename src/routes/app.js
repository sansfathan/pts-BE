const express = require("express");
const autMiddleware = require("../middleware/authMiddleware");
// const app = express();
const router = express.Router();

router.post("/user/create", (req, res) => {
  const payload = req.body;
  const { kelas, name ,dari} = req.body;
  res.json({
    status: "Success",
    msg: "Latihan Request Body",
    payload: payload,
    kelas: kelas,
    dari: dari
  });
});

//latihan routing params
router.get("/", (req, res) => {
  res.send("Hello World");
});

//menangani error
router.get("/handler", (req, res) => {
  res.send({
    status: "succses",
    message: "Berhasil",
  });
});

// router.use(autMiddleware);

//menangani request body dengan middleware

router.post("/post", autMiddleware, (req, res) => {
  res.send("Hello POST");
});

//latihan query string

router.get("/absensi/:nama", (req, res) => {
  let { nama } = req.params;
  let { status, dari_tanggal, sampai_tanggal } = req.query;

  res.send({
    message: `OK`,
    data: {
      nama: nama,
      status: status,
      dari_tanggal: dari_tanggal,
      sampai_tanggal: sampai_tanggal,
    },
  });
});

module.exports = br;
