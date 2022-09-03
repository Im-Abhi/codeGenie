const express = require("express");
const bodyParser = require("body-parser");
const FileApi = require("./api/FileApi.js");
const RunnerManager = require("./compiler/RunnerManager")
const PORT = process.env.PORT || 8000;
const app = express()

//import {execa} from 'execa';
//execa = require('execa')

app.use(bodyParser.urlencoded({ extended: false }));
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
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
/*
// CPP
async function reBuildCppImage() {
    return await execa('docker', ['build', './languages/cpp', '-t', 'cpp_image:latest']);
}

async function runCppContainer() {
    await reBuildCppImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'cpp_image:latest']);
    return stdout;
}

async function runCPP() {
    const data = await runCppContainer();
    console.log(data);
}

// Python
async function reBuildPythonImage() {
    await execa('docker', ['build', './languages/python', '-t', 'python_image:latest']);
}

async function runPythonContainer() {
    await reBuildPythonImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'python_image:latest']);
    return stdout
}

async function runPython() {
    const data = await runPythonContainer();
    console.log(data);
}

// Javascript
async function reBuildJavascriptImage() {
    await execa('docker', ['build', './languages/python', '-t', 'python_image:latest']);
}

async function runJavascriptContainer() {
    await reBuildJavascriptImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'python_image:latest']);
    return stdout
}

async function runJavaScript() {
    const data = await runJavascriptContainer();
    console.log(data);
}

// runCPP()
// runPython()
runJavaScript()
*/