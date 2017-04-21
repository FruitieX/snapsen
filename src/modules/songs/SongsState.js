export const ACTIVATE_SEARCH = 'ACTIVATE_SEARCH';
export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const ACTIVATE_FILTER = 'ACTIVATE_FILTER';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

export function activateSearch() {
  return {
    type: ACTIVATE_SEARCH
  };
}

export function searchChange(text) {
  return {
    type: SEARCH_CHANGE,
    payload: text
  };
}

export function activateFilter(type) {
  return {
    type: ACTIVATE_FILTER,
    payload: type
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS
  };
}

const initialState = {
  searchText: null,
  activeFilter: null
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
    case ACTIVATE_FILTER:
      return {
        ...state,
        activeFilter: action.payload
      };
    case CLEAR_FILTERS:
      return initialState;
    default:
      return state;
  }
}
