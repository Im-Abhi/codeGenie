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
    return await this.runPython(callback);
  }

  async reBuildPythonImage() {
    await execa('docker', ['build', './languages/python', '-t', 'python_image:latest']);
  }

  async runPythonContainer() {
    await this.reBuildPythonImage();
    const { stdout, stderr } = await execa('docker', ['run', '--rm', 'python_image:latest']);
    if (stderr) return stderr;
    return stdout;
  }

  async runPython(callback) {
    try {
      const data = await this.runPythonContainer();
      callback('0', String(data));
    } catch (err) {
      callback('2', String(err));
    }
  }

  log(message) {
    console.log(message);
  }
}

module.exports = PythonRunner;
