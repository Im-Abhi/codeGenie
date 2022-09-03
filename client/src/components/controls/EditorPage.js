import React, { useState } from 'react';

// import { Form, FormGroup, Col, Button } from 'react-bootstrap';
import LangSelector from './controls/LangSelector';
import CodeEditor from './controls/CodeEditor';
import AlertDismissable from './controls/AlertDismissable';
import OutputBox from './controls/OutputBox';
import StatusImage from './controls/StatusImage';
// import CompilerApi from '../api/CompilerApi';

const languages = ['C', 'C++', 'Java', 'JavaScript', 'Python'];

const EditorPage = () => {
    const [selectedLang, setSelectedLang] = useState(2);
    const [task, setTask] = useState({
        lang: 'java',
        code: '',
    });
    const [response, setResponse] = useState({
        status: '0',
        message: '',
    });

    const handleRun = (event) => {
        event.preventDefault();
        CompilerApi.run(task)
            .then((res) => {
                setResponse(res);
            }).catch((error) => {
                console.log(error);
                // .handleError(error);
            });
    }

    const updateSolution = (event) => {
        // event.preventDefault();
        console.log(task);
        const field = event.target.name;
        let newtask = task;
        newtask[field] = event.target.value,
            setTask(newtask);
    };

    const handleLangChange = (event) => {
        const index = parseInt(event.target.value, 10);
        CompilerApi.getTask(languages[index]).then((task) => {
            console.log(task);
            setTask(task);
        });
        const response = { status: '0', message: '' };
        setResponse(response);
        setSelectedLang(index);
    };

    const handleCodeChange = (code) => {
        setTask({
            lang: task.lang,
            code: code,
        });
    };

    return (
        <>

            {/* componentDidMount() {
                CompilerApi.getTask('java')
                    // .then(res => res.json())
                    .then((task) => {
                        console.log(task);
                        this.setState({ task });
                    });
  } */}
            <div className="container">
                <Form horizontal>
                    <FormGroup controlId="code">
                        <Col sm={12}>
                            <LangSelector
                                langs={languages}
                                selectedIndex={selectedLang}
                                onChange={handleLangChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="code">
                        <Col sm={12}>
                            <CodeEditor onChange={handleCodeChange} code={task.code} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            <Button bsStyle="primary" type="button" onClick={handleRun}>
                                Run
                            </Button>
                            <StatusImage
                                hasError={response.status !== '0'}
                                message={response.message}
                            />
                        </Col>
                        <Col sm={10} />
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <AlertDismissable
                                show={response.status !== '0'}
                                message={response.message}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <OutputBox
                                show={response.status === '0'}
                                message={response.message}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </>
    )
}

export default EditorPage;
