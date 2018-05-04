import actions from 'utils/actions.json';


const initialState = {
  digits: '',
  lastWord: '',
  lastWordIndex: -1,
  suggestions: [],
  text: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.fetchSuggestions.fulfilled: {
      const { digits, suggestions } = action.payload.data;

      // For now suggestions are ordered by rank (lower == better).
      // Later it could also be possible to take into account how many times
      // each word was used by the user.
      let orderedSuggestions = suggestions.sort((a, b) => {
        if (a.rank < b.rank) {
          return 1;
        }

        if (a.rank > b.rank) {
          return -1;
        }

        return 0;
      });

      if (orderedSuggestions.length === 0) {
        orderedSuggestions = [{ word: '' }];
      }

      return {
        ...state,
        digits,
        lastWord: orderedSuggestions[0].word,
        lastWordIndex: 0,
        suggestions: orderedSuggestions,
      };
    }

    case actions.nextSuggestion: {
      // Cycle through the suggestions.
      const lastWordIndex = (state.lastWordIndex + 1) % state.suggestions.length;

      return {
        ...state,
        lastWordIndex,
        lastWord: state.suggestions[lastWordIndex].word,
      };
    }

    case actions.endSuggestion: {
      // Save the current word on the text array, and start a new word.
      const text = [...state.text];
      text.push({
        word: state.lastWord,
        index: state.lastWordIndex,
        suggestions: [...state.suggestions],
      });

      return {
        ...state,
        text,
        digits: '',
        lastWord: '',
        lastWordIndex: 0,
        suggestions: [{ word: '' }],
      };
    }

    default:
      return state;
  }
};
