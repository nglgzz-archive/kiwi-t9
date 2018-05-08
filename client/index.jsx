import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import App from 'components/App';
import store from 'store/store';
import { saveState } from 'store/localStorage';


// Subscribe to each state change and save the state to local storage if
// possible. Use throttle to ensure the state is not being saved too often,
// degrading performance.
store.subscribe(throttle(() => saveState(store.getState()), 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('target'),
);
