import axios from 'axios';


export const textReset = () => ({ type: 'TEXT_RESET' });
export const charDelete = () => ({ type: 'CHAR_DELETE' });
export const wordNext = () => ({ type: 'WORD_NEXT' });
export const wordEnd = space => ({ type: 'WORD_END', space });
export const changeCase = () => ({ type: 'CHANGE_CASE' });

export const suggestionsFetch = digits => ({
  type: 'SUGGESTIONS_FETCH',
  payload: axios.get(`/api/suggestions?q=${digits}`),
});

let lastSymbolInsert;
export const symbolInsert = () => {
  const currentTime = new Date();

  // If this is the first time the user is pressing the symbol button, or of the
  // last time it was pressed was more than 700ms ago, then insert a new symbol.
  if (!lastSymbolInsert || (currentTime - lastSymbolInsert) > 700) {
    lastSymbolInsert = currentTime;
    return { type: 'SYMBOL_INSERT' };
  }

  // Otherwise just cycle through the possible values for the last symbol.
  lastSymbolInsert = currentTime;
  return { type: 'SYMBOL_NEXT' };
};

