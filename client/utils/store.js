import { applyMiddleware, createStore, compose } from 'redux';

// Redux middleware that allows to pass a Promise within the action object.
import promise from 'redux-promise-middleware';

// Redux middleware that allows to pass functions to the dispatch method.
import thunk from 'redux-thunk';
import reducer from 'reducers/index';


// Used for Redux Dev Tools
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(promise(), thunk);


export default createStore(reducer, {}, composeEnhancers(middleware));
