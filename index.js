const express = require('express')
const path = require("path");
const fs = require("fs");
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000;
const HOST = `http://localhost`;

const pdfDir = path.join(__dirname, "public/pdfs");
const getAbsolutePath = (query = "") => {
  return path.join(__dirname, query);
}
const fileName = 'JSR.pdf';
const files = fs.readdirSync(pdfDir).map(name => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/pdfs/${name}`
  };
});

app.use(cors());

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendFile(getAbsolutePath('index.html'));
})

app.get('/pdf', (req, res) => {
  res.sendFile(getAbsolutePath('pdfjs.html'));
})

app.post('/pdf', (req, res) => {
  res.sendFile(`${pdfDir}/${fileName}`);
})

app.listen(PORT, () => console.log(`app listening on ${HOST}:${PORT}`));