import actions from 'utils/actions.json';
import axios from 'axios';


export default digits => ({
  type: actions.fetchSuggestions.def,
  payload: axios.get(`/api/suggestions?q=${digits}`),
});
