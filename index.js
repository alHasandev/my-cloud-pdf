const express = require('express')
const path = require("path");
const fs = require("fs");
const cors = require('cors');

const app = express()
const PORT = 3000;

const dirPath = path.join(__dirname, "public/pdfs");
const fileName = 'JSR.pdf';
const files = fs.readdirSync(dirPath).map(name => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/pdfs/${name}`
  };
});

app.use(cors());

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/pdf', (req, res) => {
  res.sendFile(`${dirPath}/${fileName}`);
})

app.listen(PORT, () => console.log(`app listening on http://localhost:${PORT}`));