import actions from 'utils/actions.json';
import axios from 'axios';


export const fetch = digits => ({
  type: actions.fetchSuggestions.def,
  payload: axios.get(`/api/suggestions?q=${digits}`),
});

export const next = () => ({
  type: actions.nextSuggestion,
});

// Here a request with the chosen word could be added, so the suggestions
// could adapt to the user's usage.
export const end = () => ({
  type: actions.endSuggestion,
});

export const wordDelete = () => ({
  type: actions.wordDelete,
});
