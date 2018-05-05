import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as suggestions from 'actions/Suggestions';
import 'sass/Screen.sass';

@connect(store => ({
  digits: store.text.digits,
  lastWord: store.text.lastWord,
  text: store.text.text.map(({ word }) => word).join(' '),
}))
export default class Screen extends Component {
  constructor(props) {
    super(props);

    this.handleSend = this.handleSend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSend() {
    const message = `${this.props.text} ${this.props.lastWord}`;
    const signature = ' - I can use T9 https://t9.nglgzz.com';
    const tweet = encodeURI(message + signature);

    window.location.href = `https://twitter.com/home?status=${tweet}`;
  }

  handleDelete() {
    if (this.props.digits) {
      // Fetch suggestions for the last sequence of digits, minus the
      // last digit.
      this.props.dispatch(suggestions.fetch(this.props.digits.slice(0, -1)));
    } else if (this.props.text.length > 0) {
      // Remove current word and pop last word from text.
      this.props.dispatch(suggestions.previous());
    }
  }

  render() {
    const { text, lastWord } = this.props;

    return (
      <div className="screen">
        <div className="statusbar">
          {(new Date()).toLocaleTimeString().slice(0, 5)}
        </div>

        <div className="textbox">
          <span>{text} </span>
          <span className="textbox-lastword">{lastWord}</span>
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
