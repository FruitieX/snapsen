import { createAction, createReducer } from 'redux-act';

export const activateSearch = createAction('Activate search bar');
export const searchChange = createAction('Change search bar text');
export const activateBookFilter = createAction('Activate song book filter');
export const activateTypeFilter = createAction('Activate song type filter');
export const clearFilters = createAction(
  'Clear search bar and song type filters',
);

const initialState = {
  searchText: null,
  type: null,
  book: null,
};

export default createReducer(
  {
    [activateSearch]: state => ({ ...state, searchText: '' }),
    [searchChange]: (state, payload) => ({ ...state, searchText: payload }),
    [activateTypeFilter]: (state, payload) => {
      if (state.type === payload) {
        return {
          ...state,
          type: null,
        };
      }

      return {
        ...state,
        type: payload,
      };
    },
    [activateBookFilter]: (state, payload) => {
      if (state.book === payload) {
        return {
          ...state,
          book: null,
        };
      }

      return {
        ...state,
        book: payload,
        type: null,
      };
    },
    [clearFilters]: state => initialState,
  },
  initialState,
);
