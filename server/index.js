const express = require("express");
const bodyParser = require("body-parser");
const FileApi = require("./api/FileApi.js");
const RunnerManager = require("./compiler/RunnerManager")
const PORT = process.env.PORT || 8000;
const app = express()

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

app.get('/api/file/:lang', (req, res) => {
    const language = req.params.lang;
    FileApi.getFile(language, (content) => {
        const file = {
            lang: language,
            code: content,
        };
        return res.send(JSON.stringify(file));
    });
});

app.post('/api/run', async (req, res) => {
    const file = req.body;
    return RunnerManager.run(file.lang, file.code, res);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));