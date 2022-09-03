<<<<<<< HEAD
const express = require("express");
const bodyParser = require("body-parser");
const FileApi = require("./api/FileApi");

const PORT = process.env.PORT || 8000;
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

// Add headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello! welcome to our api!' });
});

app.get('/api/file/:lang', (req, res) => {
    const language = req.params.lang;
    console.log(language);
    FileApi.getFile(language, (content) => {
      const file = {
        lang: language,
        code: content,
      };
      res.send(JSON.stringify(file));
    });
  });
  

app.post('/api/run', (req, res) => {
    const file = req.body;
    console.log(`file.lang: ${file.lang}`, `file.code:${file.code}`);
    RunnerManager.run(file.lang, file.code, res);
  });
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));



=======
import { execa } from 'execa';

async function reBuildImage() {
    return await execa('docker', ['build', '.', '-t', 'cpp_image']);
}

async function runContainer() {
    await reBuildImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'cpp_image']);
    return stdout;
}


const data = await runContainer();
console.log(data);
>>>>>>> 37b9a16bfe3cf1fb56f6048cc2238fc02b230072
