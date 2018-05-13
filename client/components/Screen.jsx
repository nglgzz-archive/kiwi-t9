import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textReset, charDelete } from 'actions/index';
import 'sass/Screen.sass';


export class Screen extends Component {
  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleReset() {
    this.props.dispatch(textReset());
  }

  handleSend() {
    const tweet = `${this.props.words} - written with T9 https://t9.nglgzz.com`;
    window.location.assign(`https://twitter.com/home?status=${encodeURI(tweet)}`);
  }

  handleDelete() {
    this.props.dispatch(charDelete());
  }

  render() {
    const { words } = this.props;
    const now = new Date();
    const minutes = `${now.getMinutes()}`.padStart(2, 0);

    return (
      <div className="screen">
        <div className="statusbar">
          <span className="charcounter">{140 - words.length}</span>
          <span className="clock">{`${now.getHours()}:${minutes}`}</span>
        </div>
        <div className="textbox">{words}</div>

        <div className="actions">
          <button className="actions--reset" onClick={this.handleReset}>Reset</button>
          <button className="actions--send" onClick={this.handleSend}>Send</button>
          <button className="actions--delete" onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
}


export default connect(({ text }) => ({
  // Chain all words, the symbols attached to them, and add space where needed.
  words: text.reduce((words, { word, symbols, space }) => (
    [...words, word, symbols, (space ? ' ' : '')]
  ), []).join(''),
}))(Screen);
