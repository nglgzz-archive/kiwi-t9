import React from 'react';
import Keypad from 'components/Keypad';
import Screen from 'components/Screen';
import 'sass/App.sass';


export default () => (
  <div className="phone">
    <div className="speaker">
      <span />
      <span />
      <span />
    </div>

    <Screen />
    <Keypad />
  </div>
);
