const fs = require('fs');

const uploadImage = (req, res) => {
  const imageBuffer = JSON.parse(req.body.imagebuff);
  const arr = [];
  Object.keys(imageBuffer).forEach((key) => {
    arr[key] = imageBuffer[key];
  });
  fs.writeFile(`../storage/${req.body.fileName}`, Buffer.from(arr), (error) => {
    if (error) return res.status(400).send({ success: false, error });
    console.log('The file has been saved!');
    return res.status(200).send({ success: true });
  });
};

module.exports = {
  uploadImage,
};
