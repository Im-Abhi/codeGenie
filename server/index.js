import { execa } from 'execa';

async function reBuildImage() {
    return await execa('docker', ['build', '.', '-t', 'cpp_image']);
}

async function runContainer() {
    await reBuildImage();
    const { stdout } = await execa('docker', ['run', '--rm', 'cpp_image']);
    return stdout;
}


const data = await runContainer();
console.log(data);