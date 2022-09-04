import React from "react";

import LangSelector from "../components/controls/LangSelector";
import CodeEditor from "../components/controls/CodeEditor";
import AlertDismissable from "../components/controls/AlertDismissable";
import OutputBox from "../components/controls/OutputBox";
import CompilerApi from "../api/CompilerApi";

let languages = ["JavaScript", "Python", "C++"];
const languagesProd = ["JavaScript", "Python", "C++"];

class Editor extends React.Component {
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV === "production") {
            languages = languagesProd;
        }

        this.state = {
            selectedLang: 0, // JavaScript
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
        this.updateSolution = this.updateSolution.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    componentDidMount() {
        CompilerApi.getTask("javascript")
            // .then(res => res.json())
            .then((task) => {
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
        const { task } = this.state;
        CompilerApi.run(task)
            .then((res) => {
                this.setState({ response: res });
            })
            .catch((error) => {});
    }

    updateSolution(event) {
        // event.preventDefault();
        const field = event.target.name;
        const { task } = this.state;
        task[field] = event.target.value;
        return this.setState({ task });
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
        return <div></div>;
    }
}

export default Editor;
