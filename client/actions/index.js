import axios from 'axios';


export const textReset = () => ({ type: 'TEXT_RESET' });
export const charDelete = () => ({ type: 'CHAR_DELETE' });
export const wordNext = () => ({ type: 'WORD_NEXT' });
export const wordEnd = space => ({ type: 'WORD_END', space });
export const changeCase = () => ({ type: 'CHANGE_CASE' });


let lastSuggestionsFetch;
export const suggestionsFetch = digits => (dispatch) => {
  lastSuggestionsFetch = new Date();

  // Whatever happens update the digits first, so the user gets instant feedback
  // from the UI.
  dispatch({ type: 'DIGITS_UPDATE', payload: digits });

  // Wait 300ms before sending the request, this is to avoid sending useless
  // intermediate requests if the user is typing fast (probably not the case in
  // 2018, people haven't used T9 in a decade... but, you never know).
  setTimeout(() => {
    const currentTime = new Date();

    // Fetch suggestions only if the suggestionsFetch function hasn't been
    // called again after this timer was set.
    if ((currentTime - lastSuggestionsFetch) >= 300) {
      dispatch({
        type: 'SUGGESTIONS_FETCH',
        payload: axios.get(`/api/suggestions?q=${digits}`),
        meta: digits,
      });
    }
  }, 300);
};


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

