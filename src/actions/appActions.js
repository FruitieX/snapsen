import * as types from './actionTypes.js';

export function clearSearch() {
  return {
    type: types.CLEAR_SEARCH
  };
}

export function searchChange(text) {
  return {
    type: types.SEARCH_CHANGE,
    payload: text
  };
}
