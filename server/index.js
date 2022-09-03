import { execa } from 'execa';

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