import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'sass/Screen.sass';


@connect(store => ({
  text: store.text.text,
  lastWord: store.text.lastWord,
}))
export default class Screen extends Component {
  render() {
    const { text, lastWord } = this.props;

    return (
      <div className="screen">
        <div className="statusbar">
          {(new Date()).toLocaleTimeString().slice(0, 5)}
        </div>

        <div className="textbox">
          <span>{text}</span>
          <span className="last-word">{lastWord}</span>
          <span className="cursor" />
        </div>

        <div className="actions">
          <a href="/">Send</a>
        </div>
      </div>
    );
  }
}
