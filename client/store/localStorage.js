export const loadState = () => {
  // Accessing local storage could fail depending on the browser's privacy
  // settings, or if the user is browsing on incognito mode. In such case
  // an empty object is returned and Redux will initialize the state.
  try {
    const serializedState = window.localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  // Accessing local storage could fail in the same way as explained above.
  // Additionally JSON.stringify could also fail if the state is not
  // serializable (which shouldn't happen in our case).
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
