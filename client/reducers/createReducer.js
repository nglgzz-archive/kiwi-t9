// This function allows you to avoid huge switch statements on reducers.
// Handlers, is an object with action types as keys and functions that return
// the new state as keys.
export default (initialState, handlers) => (state = initialState, action) => {
  // Use Object.prototype.hasOwnProperty instead of handlers[action.type] to
  // check only properties of the object.
  // https://stackoverflow.com/a/17150859/3720495
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};
