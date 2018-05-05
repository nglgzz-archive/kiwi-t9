import actions from 'utils/actions.json';


let lastCall;
export const insert = () => {
  const currentTime = new Date();

  // If this is the first time the user is pressing the symbol button, or of the
  // last time it was pressed was more than 500ms ago, then insert a new symbol.
  if (!lastCall || (currentTime - lastCall) > 500) {
    lastCall = currentTime;
    return {
      type: actions.symbol.insert,
    };
  }

  // Otherwise just cycle through the possible values for the last symbol.
  lastCall = currentTime;
  return {
    type: actions.symbol.next,
  };
};

export const deleteSymbol = () => ({
  type: actions.symbol.deleteSymbol,
});
