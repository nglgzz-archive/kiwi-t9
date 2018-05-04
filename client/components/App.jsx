import React from 'react';
import Keypad from 'components/Keypad';
import Screen from 'components/Screen';
import 'sass/App.sass';


export default () => (
  <div className="phone">
    <Screen />
    <Keypad />
  </div>
);
