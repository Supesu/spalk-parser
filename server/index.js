// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors());

const { exec } = require('child_process');

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const filePath = './uploads/' + file.originalname;

  exec(`cat "${filePath}" | node ../parser/dist/index.js`, (error, stdout, stderr) => {
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return res.status(200).send(stderr);
    }

    res.status(200).send('File uploaded successfully');
  });
});
app.listen(3030, () => {
  console.log('Server started on port 3030');
});