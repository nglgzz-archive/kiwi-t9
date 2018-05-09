import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Action from 'actions/index';
import 'sass/Key.sass';


@connect(({ text }) => ({
  digits: text[text.length - 1].digits,
  symbols: text[text.length - 1].symbols,
}))
export default class Key extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    switch (this.props.label) {
      case '1':
        // Insert or rotate between symbols
        this.props.dispatch(Action.symbolInsert());
        break;

      case '*':
        // Cycle through suggestions
        this.props.dispatch(Action.wordNext());
        break;

      case '0':
        // Finish the current word and start a new one
        this.props.dispatch(Action.wordEnd(true));
        break;

      case '#':
        // change case
        break;

      default:
        // Another word is starting right after a symbol, end the current word and
        // add no space.
        if (this.props.symbols) {
          this.props.dispatch(Action.wordEnd(false));
          this.props.dispatch(Action.suggestionsFetch(this.props.label));
          break;
        }

        this.props.dispatch(Action.suggestionsFetch((
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
