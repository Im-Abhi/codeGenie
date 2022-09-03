const path = require("path");
const FileApi = require("../api/FileApi");
const CRunner = require("./CRunner");
const CppRunner = require("./CppRunner");
const JavaScriptRunner = require("./JavaScriptRunner");
const PythonRunner = require("./PythonRunner");

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

    if (lang === "c") {
      runner = new CRunner();
    } else if (lang === "c++") {
      runner = new CppRunner();
    } else if (lang === "javascript") {
      runner = new JavaScriptRunner();
    } else if (lang === "python") {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(lang, code, res) {
    console.log(`lang: -> ${lang}`);
    var add = '\nfreopen("input.txt", "r", stdin);';
    if (lang == "C++") {
      add = '\nfreopen("input.txt", "r", stdin);';
      let position = code.search("main");
      var tempcode = [
        code.slice(0, position + 7),
        add,
        code.slice(position + 7),
      ].join("");
      code = tempcode;
      console.log(tempcode);
    } else if (lang == "Python") {
      add = "import sys\nsys.stdin = open('input.txt', 'r')\n";
      var tempcode = [code.slice(0, 0), add, code.slice(0)].join("");
      code = tempcode;
      console.log(tempcode);
    }
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());
    const directory = path.join(__dirname, "temp");
    const file = path.join(directory, runner.defaultFile());
    console.log(`file: ${file}`);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    console.log(`filename: ${filename}`);
    console.log(`extension: ${extension}`);

    FileApi.saveFile(file, code, () => {
      runner.run(file, directory, filename, extension, (status, message) => {
        const result = {
          status,
          message,
        };
        res.end(JSON.stringify(result));
      });
    });
  },
};
