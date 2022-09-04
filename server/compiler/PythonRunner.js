const Runner = require('./Runner')
const execa = require("execa")
class PythonRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = '../../languages/python/main.py';
  }

  async run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.py') {
      return;
    }
    await this.runPython(file, directory, callback);
  }

  async reBuildPythonImage() {
    await execa('docker', ['build', './languages/python', '-t', 'python_image:latest']);
  }

  async runPythonContainer() {
    await this.reBuildPythonImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'python_image:latest']);
    return stdout
  }

  async runPython() {
    const data = await this.runPythonContainer();
    console.log(data);
  }

  log(message) {
    console.log(message);
  }
}

module.exports = PythonRunner;
