import React from 'react';

import LangSelector from '../components/controls/LangSelector';
import CodeEditor from '../components/controls/CodeEditor';
import AlertDismissable from '../components/controls/AlertDismissable';
import OutputBox from '../components/controls/OutputBox';
import StatusImage from '../components/controls/StatusImage';
import CompilerApi from '../api/CompilerApi';

let languages = ['JavaScript', 'Python', 'C++'];
const languagesProd = ['JavaScript', 'Python', 'C++'];

class Editor extends React.Component {
    constructor(props) {
        super(props);

        console.log(`env: ${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV === 'production') {
            languages = languagesProd;
        }

        this.state = {
            selectedLang: 0, // JavaScript
            task: {
                lang: 'javascript',
                code: '',
            },
            response: {
                status: '0',
                message: '',
            },
        };

        this.handleRun = this.handleRun.bind(this);
        this.updateSolution = this.updateSolution.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    componentDidMount() {
        CompilerApi.getTask('javascript')
            // .then(res => res.json())
            .then((task) => {
                console.log(task);
                this.setState({ task });
            });
    }

    handleCodeChange(code) {
        const { task } = this.state;
        task.code = code;
        console.log(code);
        return this.setState({ task });
    }

    handleRun(event) {
        event.preventDefault();
        const { task } = this.state;
        console.log(task);
        CompilerApi.run(task)
            .then((res) => {
                this.setState({ response: res });
            })
            .catch((error) => {
                console.log(error);
                // this.handleError(error);
            });
    }

    updateSolution(event) {
        // event.preventDefault();
        console.log(this.state.task);
        const field = event.target.name;
        const { task } = this.state;
        task[field] = event.target.value;
        return this.setState({ task });
    }

    handleLangChange(event) {
        const index = parseInt(event.target.value, 10);
        CompilerApi.getTask(languages[index]).then((task) => {
            console.log(task);
            this.setState({ task });
        });
        const response = { status: '0', message: '' };
        this.setState({ response });
        return this.setState({ selectedLang: index });
    }

    render() {
        return (
            <div>
                <header className='flex justify-between p-5 items-center'>
                    <div className="image__container">
                        <img src='' alt='logo' />
                    </div>
                    <div className="select_lang">
                        <LangSelector
                            langs={languages}
                            selectedIndex={this.state.selectedLang}
                            onChange={this.handleLangChange}
                        />
                    </div>
                </header>
                <div className='editor__container grid px-4 gap-0.5 border border-top border-grey-100'>
                    <div className='editor'>
                        <CodeEditor onChange={this.handleCodeChange} code={this.state.task.code} currentLang={this.state.currentLang} />
                    </div>
                    <div className='io__container text-white'>
                        <div className='input-block h-1/2'>
                            <h3 className='bg-black'>Input</h3>
                            <textarea
                                rows={9}
                                resize='none'
                                className='bg-black text-white w-full'
                            >
                            </textarea>
                        </div>
                        <div className='output-block h-1/2 relative'>
                            <h3 className='bg-black'>Output</h3>
                            <StatusImage
                                hasError={this.state.response.status !== '0'}
                                message={this.state.response.message}
                            />
                            <AlertDismissable
                                show={this.state.response.status !== '0'}
                                message={this.state.response.message}
                            />
                            <OutputBox
                                show={this.state.response.status === '0'}
                                message={this.state.response.message}
                            />
                            <button className='rounded-full !absolute bottom-0 right-0 bg-blue-500 p-2' onClick={this.handleRun}>run</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;
