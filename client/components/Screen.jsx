import React from 'react';
import 'sass/Screen.sass';


export default () => (
  <div className="screen">
    <div className="statusbar">
      {(new Date()).toLocaleTimeString().slice(0, 5)}
    </div>

    <div className="textbox">
      <span>
        something something
        something something
        something something
        something something
        something something
        something something
        something something
        something something
        something something
        something something
      </span>
      <span className="cursor" />
    </div>

    <div className="actions">
      <a href="/">Send</a>
    </div>
  </div>
);
