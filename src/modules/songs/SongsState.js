import * as types from '../../actions/actionTypes';

const initialState = {
  searchText: ''
};

export default function songsState(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEARCH_CHANGE:
      return {
        ...state,
        searchText: action.payload
      };
    case types.CLEAR_SEARCH:
      return {
        ...state,
        searchText: ''
      };
    default:
      return state;
  }
}
