// const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.memoryStorage({
  // destination: "../storage/uploads/",
  // filename: function (req, file, cb) {
  //   cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  // }
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single('image');

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    console.log('Request file ---', req.file);// Here you get file.
    /* Now do where ever you want to do */
    fs.writeFile(`../storage/${req.file.originalname}`, req.file.buffer, (error) => {
      if (err) return res.status(400).send(error);
      console.log('The file has been saved!');
    });
    console.log(req.file);
    if (!err) { return res.status(200).send(''); }
    return res.status(400).send('');
  });
};

module.exports = {
  uploadImage,
};
