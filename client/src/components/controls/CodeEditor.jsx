import React from 'react';
import PropTypes from 'prop-types';

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';
// Import a Mode (language)
import 'brace/mode/javascript';
import 'brace/mode/c_cpp';
import 'brace/mode/python';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/monokai';

const editorStyle = {
  border: '1px solid lightgray',
};

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.props.onChange(newValue);
  }

  render() {
    return (
      <AceEditor
        style={editorStyle}
        readOnly={false}
        onChange={this.onChange}
        width="100%"
        height="100%"
        mode="javascript"
        theme="monokai"
        name="aceCodeEditor"
        // onLoad={this.onLoad}
        fontSize={14}
        showPrintMargin
        showGutter
        highlightActiveLine
        value={this.props.code}
        editorProps={{
        }}
        setOptions={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CodeEditor;
