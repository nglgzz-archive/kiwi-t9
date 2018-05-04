import React from 'react';
import Key from 'components/Key';
import keypadLayout from 'utils/keypadLayout.json';
import 'sass/Keypad.sass';


export default () => {
  const keys = keypadLayout.map(({ label, description }, index) => (
    <Key
      position={index}
      key={label}
      label={label}
      description={description}
    />
  ));

  return (
    <div className="keypad">{keys}</div>
  );
};
