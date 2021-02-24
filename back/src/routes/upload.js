const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../front/files')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage }).single('file');

router.post('/', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error(err)
      return res.status(500).json(err);
    } else if (err) {
      console.error(err)
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file)
  })
});

module.exports = router;