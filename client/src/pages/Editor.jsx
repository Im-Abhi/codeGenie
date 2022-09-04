import React from "react";
import { FaPlay } from "react-icons/fa";

import LangSelector from "../components/controls/LangSelector";
import CodeEditor from "../components/controls/CodeEditor";
import AlertDismissable from "../components/controls/AlertDismissable";
import OutputBox from "../components/controls/OutputBox";
import CompilerApi from "../api/CompilerApi";

let languages = ["JavaScript", "Python", "C++"];

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
        };

        this.handleRun = this.handleRun.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    componentDidMount() {
        CompilerApi.getTask("javascript").then((task) => {
            this.setState({ task });
        });
    }

    handleCodeChange(code) {
        const { task } = this.state;
        task.code = code;
        return this.setState({ task });
    }

    handleRun(event) {
        event.preventDefault();
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
                    <div className="image__container">
                        <img
                            src="/logo.png"
                            alt="logo"
                            width="60px"
                            height="40px"
                        />
                    </div>
                    <div className="select_lang">
                        <LangSelector
                            langs={languages}
                            selectedIndex={this.state.selectedLang}
                            onChange={this.handleLangChange}
                        />
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
                    <div className="io__container !text-white bg-monokai grid grid-rows-2 border border-[#fff] relative">
                        <div className="input-block">
                            <h3 className="io_heading">Input</h3>
                            <textarea
                                rows={9}
                                resize="none"
                                className="bg-black text-white w-full border-b border-[#fff]"
                            ></textarea>
                        </div>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;
