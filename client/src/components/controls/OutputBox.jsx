import React from "react";
import PropTypes from "prop-types";

class OutputBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        if (this.props.show) {
            return (
                <textarea
                    className="!text-white w-full"
                    name="code"
                    type="textarea"
                    componentClass="textarea"
                    rows="9"
                    readOnly
                    value={this.props.message}
                ></textarea>
            );
        }

        return (
            <textarea
                className="!text-white"
                name="code"
                type="textarea"
                componentClass="textarea"
                rows="9"
                readOnly
                value=""
            ></textarea>
        );
    }
}

OutputBox.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
};

export default OutputBox;
