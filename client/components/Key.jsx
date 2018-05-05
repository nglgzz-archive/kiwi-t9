import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Suggestions from 'actions/Suggestions';
import * as Symbols from 'actions/Symbols';
import 'sass/Key.sass';


@connect(store => ({
  digits: store.text.digits,
}))
export default class Key extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    switch (this.props.label) {
      case '1':
        this.props.dispatch(Symbols.insert());
        break;

      case '*':
        // Cycle through suggestions
        this.props.dispatch(Suggestions.next());
        break;

      case '0':
        // Finish the current word and start a new one
        this.props.dispatch(Suggestions.end());
        break;

      case '#':
        // add new word
        break;

      default:
        this.props.dispatch(Suggestions.fetch((
          this.props.digits + this.props.label
        )));
    }
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


Key.propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
