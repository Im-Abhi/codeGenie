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

    return await this.runCPP(callback);
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

  async runCPP(callback) {
    try {
      const data = await this.runCppContainer();
      callback("0", String(data));
    } catch (err) {
      callback("2", String(err));
    }
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CppRunner;
