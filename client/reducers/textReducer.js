import actions from 'utils/actions.json';


const initialState = {
  digits: '',
  lastWord: '',
  lastWordIndex: -1,
  suggestions: [],
  text: '',
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.fetchSuggestions.fulfilled: {
      const { digits, suggestions } = action.payload.data;

      // For now suggestions are ordered by rank (lower == better).
      // Later it could also be possible to take into account how many times
      // each word was used by the user.
      let lastWord = '';
      let lastWordIndex = -1;
      suggestions.forEach(({ word, rank }, index) => {
        if (lastWordIndex === -1 || suggestions[lastWordIndex].rank > rank) {
          lastWord = word;
          lastWordIndex = index;
        }
      });

      return {
        ...state,
        digits,
        lastWord,
        lastWordIndex,
        suggestions,
      };
    }

    default:
      return state;
  }
};
