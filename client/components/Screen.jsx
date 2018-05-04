import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'sass/Screen.sass';


@connect(store => ({
  text: store.text.text,
  lastWord: store.text.lastWord,
}))
export default class Screen extends Component {
  render() {
    const { lastWord } = this.props;
    const text = this.props.text
      .map(({ word }) => word)
      .join(' ');

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
          <a href="/">Opt.</a>
          <a href="/">Send</a>
          <a href="/">Del.</a>
        </div>
      </div>
    );
  }
}
