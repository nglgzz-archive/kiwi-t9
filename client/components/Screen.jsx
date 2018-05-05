import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Suggestions from 'actions/Suggestions';
import * as Symbols from 'actions/Symbols';
import 'sass/Screen.sass';


@connect(store => ({
  // Join all words with the symbols attached to them, and then join them
  // together separated by spaces.
  text: store.text.text.map(({ word, symbols = '' }) => (word + symbols)).join(' '),
  digits: store.text.digits,
  lastWord: store.text.lastWord,
  symbols: store.text.symbols,
}))
export default class Screen extends Component {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSend() {
    const { text, lastWord, symbols } = this.props;
    const message = `${text} ${lastWord}${symbols}`;
    const signature = ' - written with T9 https://t9.nglgzz.com';

    const tweet = encodeURI(message + signature);
    window.location.href = `https://twitter.com/home?status=${tweet}`;
  }

  handleDelete() {
    if (this.props.symbols) {
      // Remove last symbol.
      this.props.dispatch(Symbols.deleteSymbol());
    } else if (this.props.digits) {
      // Fetch suggestions for the last sequence of digits, minus the
      // last digit.
      this.props.dispatch(Suggestions.fetch(this.props.digits.slice(0, -1)));
    } else if (this.props.text.length > 0) {
      // Remove current word and pop last word from text.
      this.props.dispatch(Suggestions.wordDelete());
    }
  }

  render() {
    const { text, lastWord, symbols } = this.props;
    const now = new Date();
    const minutes = `${now.getMinutes()}`.padStart(2, 0);

    return (
      <div className="screen">
        <div className="statusbar">
          {`${now.getHours()}:${minutes}`}
        </div>

        <div className="textbox">
          <span>{text} </span>
          <span className="textbox-lastword">{lastWord + symbols}</span>
        </div>

        <div className="actions">
          <button>Opt.</button>
          <button onClick={this.handleSend}>Send</button>
          <button onClick={this.handleDelete}>Del.</button>
        </div>
      </div>
    );
  }
}
