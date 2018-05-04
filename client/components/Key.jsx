import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'sass/Key.sass';


export default class Key extends Component {
  constructor(props) {
    super(props);

    this.handleClick = props.handleClick || this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.label);
  }

  render() {
    const { label, description, position } = this.props;
    const positionName = ['left', 'center', 'right'][position % 3];

    return (
      <button
        className={`key key--${positionName}`}
        onClick={this.handleClick}
      >
        <span className="key-label">{label}</span>
        <span className="key-description">{description}</span>
      </button>
    );
  }
}


Key.defaultProps = {
  handleClick: null,
};

Key.propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
