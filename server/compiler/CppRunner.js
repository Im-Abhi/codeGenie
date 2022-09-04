const Runner = require('./Runner')
const execa = require("execa")

class CppRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = '../../languages/cpp/main.cpp';
  }

  async run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".cpp") {
      return;
    }

    await this.runCPP(file, directory, filename, callback);
  }

  async reBuildCppImage() {
    return await execa('docker', ['build', './languages/cpp', '-t', 'cpp_image:latest']);
  }

  async runCppContainer() {
    await this.reBuildCppImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'cpp_image:latest']);
    return stdout;
  }

  async runCPP() {
    const data = await this.runCppContainer();
    console.log(data);
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CppRunner;
