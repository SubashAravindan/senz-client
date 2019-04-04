const fs = require('fs');
const cryptoJS = require('crypto-js');
const { encryptionKey } = require('../config');

const uploadImage = (req, res) => {
  const encryptedBuffer = req.body.imagebuff;
  const encoding = cryptoJS.enc.Utf8;
  const decryptedBuffer = cryptoJS.AES.decrypt(encryptedBuffer, encryptionKey).toString(encoding);
  const imageBuffer = JSON.parse(decryptedBuffer);
  const arrayBuffer = [];
  Object.keys(imageBuffer).forEach((key) => {
    arrayBuffer[key] = imageBuffer[key];
  });
  fs.writeFile(`../storage/${req.body.fileName}`, Buffer.from(arrayBuffer), (error) => {
    if (error) return res.status(400).send({ success: false, error });
    console.log('The file has been saved!');
    return res.status(200).send({ success: true });
  });
};

module.exports = {
  uploadImage,
};
