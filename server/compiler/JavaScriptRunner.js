const Runner = require("./Runner.js");
const execa = require("execa");
const fs = require("fs");
class JavaScriptRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = "../../languages/javascript/main.js";
  }

  async run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".js") {
      return;
    }
    return await this.runJavaScript(callback);
  }

  async reBuildJavascriptImage() {
    await execa("docker", [
      "build",
      "./languages/javascript",
      "-t",
      "javascript_image:latest",
    ]);
  }

  async runJavascriptContainer() {
    await this.reBuildJavascriptImage();
    const { stdout } = await execa("docker", [
      "run",
      "--rm",
      "javascript_image:latest",
    ]);
    return stdout;
  }

  async runJavaScript(callback) {
    try {
      const data = await this.runJavascriptContainer();
      callback("0", String(data));
    } catch (err) {
      callback("2", String(err));
    }
  }

  log(message) {
    (message);
  }
}

module.exports = JavaScriptRunner;
