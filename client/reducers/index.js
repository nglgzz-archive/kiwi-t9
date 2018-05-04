import { combineReducers } from 'redux';
import textReducer from 'reducers/textReducer';


// Bundled reducers used by store/store.js
export default combineReducers({
  text: textReducer,
});
