export const ACTIVATE_SEARCH = 'ACTIVATE_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SEARCH_CHANGE = 'SEARCH_CHANGE';

export function activateSearch() {
  return {
    type: ACTIVATE_SEARCH
  };
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  };
}

export function searchChange(text) {
  return {
    type: SEARCH_CHANGE,
    payload: text
  };
}

const initialState = {
  searchText: null
};

export default function songsState(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIVATE_SEARCH:
      return {
        ...state,
        searchText: ''
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        searchText: action.payload
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchText: null
      };
    default:
      return state;
  }
}
