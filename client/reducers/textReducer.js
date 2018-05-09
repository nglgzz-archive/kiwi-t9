import createReducer from 'reducers/createReducer';
import { clone, last, exceptLast } from 'utils/arrayUtils';


// state.text will contain a list of words, each word has the following
// attributes:
//   digits - digits that form the current word (doesn't include symbols)
//   case - case of the chosen word [lower, title, upper]
//   word - text for the chosen suggestion
//   index - index of the chosen suggestion
//   symbols - symbols attached to the word
//   space - wether or not the word has a trailing space
const initialState = {
  text: [{
    digits: '',
    case: 'lower',
    word: '',
    index: 0,
    symbols: '',
    space: false,
  }],
  suggestions: {},
};


// Remove all text.
function textReset({ suggestions }) {
  return {
    suggestions,
    text: initialState.text,
  };
}

// Delete one character from the current text.
function charDelete(state) {
  const newState = clone(state);
  const lastWord = last(newState.text);

  // If there's a trailing space, remove it.
  if (lastWord.space) {
    lastWord.space = false;
    return newState;
  }

  // If there are symbols present, remove the last one.
  if (lastWord.symbols) {
    lastWord.symbols = exceptLast(lastWord.symbols);
    return newState;
  }

  // Delete the last character in the last word.
  lastWord.digits = exceptLast(lastWord.digits);

  // There are more characters left, retrieve a new suggestion and show that.
  if (lastWord.digits) {
    const suggestions = newState.suggestions[lastWord.digits];
    lastWord.word = suggestions && suggestions.length ? suggestions[0].word : '';
    lastWord.index = 0;
    return newState;
  }

  // Nothing is left of the current word, delete it.
  newState.text = exceptLast(newState.text);


  // If there are no words left leave the first word in.
  if (newState.text.length === 0) {
    newState.text = initialState.text;
  }

  return newState;
}

// Cycle through suggestions for the current word.
function wordNext(state) {
  const newState = clone(state);
  const currentWord = last(newState.text);
  const currentSuggestions = newState.suggestions[currentWord.digits] || [{ word: '' }];

  currentWord.index = (currentWord.index + 1) % currentSuggestions.length;
  currentWord.word = currentSuggestions[currentWord.index].word;
  return newState;
}

// Create a new empty word and add trailing space (or not) to the previous word.
function wordEnd(state, action) {
  const newState = clone(state);

  // Add trailing space to the last word if needed.
  if (action.space) {
    const currentWord = last(newState.text);
    currentWord.space = true;
  }

  // Add the new word.
  newState.text.push(clone(initialState.text[0]));
  return newState;
}

function suggestionsFetchFulfilled(state, action) {
  const newState = clone(state);
  const lastWord = last(newState.text);
  const { digits, suggestions } = action.payload.data;

  // For now suggestions are ordered by rank (lower == better).
  // Later it could also be possible to take into account how many times
  // each word was used by the user.
  const orderedSuggestions = suggestions.sort((a, b) => (b.rank - a.rank));

  lastWord.digits = digits;
  lastWord.index = 0;
  // TODO - if there are no suggestions, show the digits or some letters on the
  // current word.
  lastWord.word = (orderedSuggestions[0] || { word: '' }).word;

  newState.suggestions[digits] = orderedSuggestions;
  return newState;
}

function symbolInsert(state) {
  const newState = clone(state);
  last(newState.text).symbols += '.';
  return newState;
}

// Cycle through the possible values for the last symbol.
function symbolNext(state) {
  const newState = clone(state);
  const currentWord = last(newState.text);

  // Find the new index for the last symbol that was inserted.
  const symbols = ['.', ',', '!', ':', '(', ')'];
  let index = symbols.indexOf(last(currentWord.symbols));
  index = (index + 1) % symbols.length;

  // Replace the last symbol.
  currentWord.symbols = exceptLast(currentWord.symbols) + symbols[index];
  return newState;
}


export default createReducer(initialState, {
  TEXT_RESET: textReset,
  CHAR_DELETE: charDelete,
  WORD_NEXT: wordNext,
  WORD_END: wordEnd,
  SUGGESTIONS_FETCH_FULFILLED: suggestionsFetchFulfilled,
  SYMBOL_INSERT: symbolInsert,
  SYMBOL_NEXT: symbolNext,
});
