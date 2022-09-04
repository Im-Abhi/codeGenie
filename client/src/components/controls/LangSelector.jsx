import React from 'react';
import PropTypes from 'prop-types';

class LangSelector extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(`You have selected ${event.target.value}`);
    this.props.onChange(event);
  }
  render() {
    return (
      <select
        id="langs"
        className="selectpicker"
        value={this.props.selectedIndex}
        onChange={this.onChange}

      >
        {this.props.langs.map((lang, index) => (
          <option key={lang} value={index}>
            {' '}
            {lang}{' '}
          </option>
        ))}
      </select>
    );
  }
}

LangSelector.propTypes = {
  langs: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LangSelector;
