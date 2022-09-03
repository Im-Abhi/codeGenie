const {spawn, exec} = require("child_process");
const Runner = require('./Runner')
const path = require("path");
const { call } = require("file-loader");

class CRunner extends Runner {
    defaultFile(){
        return this.defaultFile;
    }

    constructor(){
        super();
        this.defaultFile = "Hello.c";
    }

    run(file,directory,filename,extension,callback){
        if (extension.toLowerCase() !== '.c'){
            console.log(`${file} is not a c file.`);
            return;
        }
        this.compile(file,directory,filename,callback);
    }

    compile(file,directory,filename,callback){
        const options = {cwd : directory};
        // ['codec.c', '-o','codec.out']
        const argsCompile = [];
        argsCompile[0]=file;
        argsCompile[1] ='-o';
        argsCompile[2] =path.join(directory, `${filename}.out`);
        console.log(`argsCompile : ${argsCompile}`);

        const compiler = spawn('gcc',argsCompile);
        compiler.stdout.on('data',(data)=>{
            console.log(`stdout: ${data}`);
        })
        compiler.stderr.on('data',(data)=>{
            console.log(`compile-stderr: ${String(data)}`);
            callback('1',String(data));
        });
        compiler.on('close',(data)=>{
            if (data===0){
                this.execute(directory,filename,options,callback);
            }
        })
    }

    execute(directory,filename,options,callback){
        const cmdRun = path.join(directory,`${filename}.out`);

        const executor = spawn(cmdRun,[],options);
        executor.stdout.on('data',(output)=>{
            console.log(String(data));
            callback('0',String(output));
        });
        executor.stderr.on('data',(output)=>{
            console.log(`stderr : ${String(output)}`);
            callback('2',String(output));
        })
        executor.on('close',(output)=>{
            this.log(`stdout: ${output}`);
        })
    }

    log(message){
        console.log(message);
    }
}

module.exports = CRunner;