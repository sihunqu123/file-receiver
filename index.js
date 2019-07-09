const express = require('express');
const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });
const app = express();

const port = 1082;

app.get('/', function (req, res, next) {
  console.info('in /');
  res.write('path / is unavailable, please visit /v2/tenseflow with POST method!');
  res.end();
});

app.get('/hello', function (req, res, next) {
  console.info('in hello');
  res.write('hello you!');
  res.end();
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.post('/v2/tenseflow', upload.single('upfile'), function (req, res, next) {
  // req.body will contain the text fields, if there were any
  console.info(`req.body: ${JSON.stringify(req.body)}`);
  // req.file is the `avatar` file
  console.info(`req.files: ${JSON.stringify(req.file)}`);
  console.info(`filename(after uploaded): ${req.file.fieldname}`);
  console.info(`path(after uploaded, including filename): ${req.file.path}`);
  res.write('good');
  res.end();
});

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`));
