const express = require("express");
const path = require("path");
// const fs = require('fs');
const authMiddleware = require("../middleware/authMiddleware");
const uploadSingle = require("../storage/SingleFile");
const uploadMulti = require("../storage/MultiFile");
const router = express.Router();
const multer = require("multer");

// router.post("/upload/multi", uploadMulti ,(req,res) => {

//     res.send({
//         status: "Success",
//         msg: "upload Success",
//         file: req.files,
//         fileUrl:[
//             {
//                 fileUrl1:'http'
//             }
//         ]
//         // url: `${req.protocol}://${req.get("host")}/${req.files.filename}`

//     })
// })

router.post("/upload/multi", uploadMulti, (req, res) => {
    const files = req.files;
    const url = files.map((file, index) =>{
      return `${req.protocol}://${req.get('host')}/${req.files[index].filename}`;
    })
  
    res.send({
      status: 200,
      message: 'Upload Success',
      data: {
        file: req.files,
        fileURL: [
          url
        ]
      },
    });
  });

router.post("/upload/single", uploadSingle, (req, res) => {
  res.send({
    status: "Success",
    msg: "upload Success",
    file: req.files,
    url: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
  });
});

router.post("/user/create", (req, res) => {
  const payload = req.body;
  res.json({
    status: "Success",
    msg: "Latihan Request Body",
    payload: payload,
  });
});
// const imageFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg/jpeg/png/gif)$/)) {
//     return cb(null, false)
//   }
//   cb(null, true)
// }
const upload = multer({
  dest: "public",
  //  fileFilter: imageFilter
});
const multipleUpload = multer({ dest: "public" });

// =========================== GET ========================= //
router.get("/", (req, res) => {
  res.send("Hello world");
});
router.get("/user", (req, res) => {
  res.send({
    status: 200,
    message: "Success",
    data: {
      nama: "Fathan",
    },
  });
});
router.get("/siswa/:nama", (req, res) => {
  // let nama = req.params.nama;
  let { nama } = req.params;
  let { angkatan, sekolah } = req.query;

  console.log("params =>", req.params);
  console.log("query =>", req.query);

  res.send({
    status: 200,
    message: "Siswa ditemukan",
    data: {
      nama: `${nama}`,
      kelas: `${req.query.kelas}`,
      angkatan: `${angkatan}`,
      sekolah: `${sekolah}`,
    },
  });
});

// =========================== POST ========================= //
router.post("/", (req, res) => {
  res.send("Hello world");
});
router.get("/user", (req, res) => {
  res.send({
    status: 200,
    message: "Success",
    data: {
      nama: "fathan",
    },
  });
});
router.post("/user", (req, res) => {
  const { nama, kelas } = req.body;
  res.send({
    status: 200,
    message: "Success",
    data: {
      nama: nama,
      kelas: kelas,
    },
  });
});

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    url = `${req.protocol}://${req.get("host")}/${file.originalname}`;
    console.log("url =>", url);

    res.send({
      status: 200,
      message: "Success, File uploaded",
      url: url,
    });
  } else {
    res.send({
      status: 400,
      message: "Error, File not found",
    });
  }
});
router.post("/multipleUpload", multipleUpload.array("file", 10), (req, res) => {
  const files = req.file;

  files.map((file) => {
    if (file) {
      const target = path.join(__dirname, "public", file.originalname);
      fs.renameSync(file.path, target);
    }
  });

  res.send({
    status: 200,
    message: "Success, File uploaded",
  });
});

module.exports = router;
