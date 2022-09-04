import React from "react";
import { Link } from "react-router-dom";

import { FaPlay } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LangSelector from "../components/controls/LangSelector";
import CodeEditor from "../components/controls/CodeEditor";
import AlertDismissable from "../components/controls/AlertDismissable";
import OutputBox from "../components/controls/OutputBox";
import CompilerApi from "../api/CompilerApi";

let languages = ["JavaScript", "Python", "C++"];
let extensions = [".js", ".py", ".cpp"];

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLang: 0,
            task: {
                lang: "javascript",
                code: "",
            },
            response: {
                status: "0",
                message: "",
            },
            input: "",
            isLoading: false,
        };

        this.handleRun = this.handleRun.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.resetCode = this.resetCode.bind(this);
        this.copyCode = this.copyCode.bind(this);
        this.downloadCode = this.downloadCode.bind(this);
    }

    componentDidMount() {
        CompilerApi.getTask("javascript").then((task) => {
            this.setState({ task });
        });
    }

    downloadCode() {
        let data = this.state.task.code;
        let file = "code." + extensions[this.state.selectedLang];
        let link = document.createElement("a");
        link.download = file;
        let blob = new Blob(["" + data + ""], {
            type: "text/plain",
        });
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }

    copyCode() {
        navigator.clipboard.writeText(this.state.task.code);
        toast.success("🦄 Copied to Clipboard!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    resetCode() {
        const { task } = this.state;
        task.code = "";
        return this.setState({ task });
    }

    handleCodeChange(code) {
        const { task } = this.state;
        task.code = code;
        return this.setState({ task });
    }

    handleRun(event) {
        event.preventDefault();
        this.setState({ isLoading: !this.state.isLoading });
        const response = { status: "0", message: "" };
        this.setState({ response });
        const { task } = this.state;
        CompilerApi.run(task)
            .then((res) => {
                this.setState({ response: res });
            })
            .catch((error) => {
                console.log(error);
            });
        fetch("http://localhost:8000/api/input", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ input: this.state.input }),
        });
        this.setState({ isLoading: !this.state.isLoading });
    }

    handleLangChange(event) {
        const index = parseInt(event.target.value, 10);
        CompilerApi.getTask(languages[index]).then((task) => {
            this.setState({ task });
        });
        const response = { status: "0", message: "" };
        this.setState({ response });
        return this.setState({ selectedLang: index });
    }

    render() {
        return (
            <div className="h-full">
                <header className="flex justify-between p-5 items-center">
                    <div className="image__container cursor-pointer">
                        <Link to="/">
                            <img
                                src="/logo.png"
                                alt="logo"
                                width="60px"
                                height="40px"
                            />
                        </Link>
                    </div>
                    <div className="select_lang">
                        <div className="buttons flex gap-4">
                            <ToastContainer
                                position="top-center"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                            />
                            <LangSelector
                                langs={languages}
                                selectedIndex={this.state.selectedLang}
                                onChange={this.handleLangChange}
                            />
                            <button
                                className="pill-btns rounded-[5px] px-6 p-1 border-2 border-[#fff] text-[#fff]"
                                onClick={this.copyCode}
                            >
                                Copy
                            </button>
                            <button
                                className="pill-btns rounded-[5px] px-6 p-1 border-2 border-[#fff] text-[#fff]"
                                onClick={this.resetCode}
                            >
                                Reset
                            </button>
                            <button
                                className="pill-btns rounded-[5px] px-6 p-1 border-2 border-[#fff] text-[#fff]"
                                onClick={this.downloadCode}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </header>
                <div className="editor__container grid px-4 gap-0.5 border-t border-[#ffa] h-full">
                    <div className="editor">
                        <CodeEditor
                            onChange={this.handleCodeChange}
                            code={this.state.task.code}
                            currentLang={this.state.currentLang}
                        />
                    </div>
                    <div className="io__container !text-white bg-[#272822] grid grid-rows-2 border border-[#fff] relative">
                        <div className="input-block">
                            <h3 className="io_heading">Input</h3>
                            <textarea
                                disabled={
                                    this.state.selectedLang === 0 ? true : false
                                }
                                value={this.state.input}
                                rows={9}
                                resize="none"
                                className="bg-[#272822] text-white w-full border-b border-[#fff]"
                                onChange={(e) =>
                                    this.setState({ input: e.target.value })
                                }
                            ></textarea>
                        </div>

                        {this.state.isLoading ? (
                            <div className="flex justify-center items-center w-full h-full">
                                <img
                                    src="./loading.gif"
                                    alt="loader"
                                    height="250px"
                                    width="250px"
                                />
                            </div>
                        ) : (
                            <div className="output-block">
                                <h3 className="io_heading">Output</h3>
                                <AlertDismissable
                                    show={this.state.response.status !== "0"}
                                    message={this.state.response.message}
                                />
                                <OutputBox
                                    show={this.state.response.status === "0"}
                                    message={this.state.response.message}
                                />
                                <button
                                    className="rounded-full !absolute top-1 bg-[#6429c8] p-3 hover:bg-[#fff] transition-all duration-300 runButton"
                                    onClick={this.handleRun}
                                >
                                    <FaPlay className="text-[#fff]" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;
