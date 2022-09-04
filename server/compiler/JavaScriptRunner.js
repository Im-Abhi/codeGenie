const Runner = require('./Runner.js');
const execa = require("execa");

class JavaScriptRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = '../../languages/javascript/main.js';
  }

  async run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== '.js') {
      return;
    }
    await this.runJavaScript(file, directory, callback);
  }

  async reBuildJavascriptImage() {
    await execa('docker', ['build', './languages/javascript', '-t', 'javascript_image:latest']);
  }

  async runJavascriptContainer() {
    await this.reBuildJavascriptImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'javascript_image:latest']);
    return stdout
  }

  async runJavaScript() {
    const data = await this.runJavascriptContainer();
    console.log(data);
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaScriptRunner;
