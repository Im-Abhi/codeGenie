const Runner = require("./Runner");
const execa = require("execa");
const fs = require("fs");

class CppRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = "../../languages/cpp/main.cpp";
  }

  async run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".cpp") {
      return;
    }

    const res = await this.runCPP(file, directory, filename, callback);
    return res;
  }

  async reBuildCppImage() {
    return await execa("docker", [
      "build",
      "./languages/cpp",
      "-t",
      "cpp_image:latest",
    ]);
  }

  async runCppContainer() {
    await this.reBuildCppImage();
    const { stdout } = await execa("docker", [
      "run",
      "--rm",
      "cpp_image:latest",
    ]);
    return stdout;
  }

  async runCPP() {
    const data = await this.runCppContainer();
    return data;
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CppRunner;
