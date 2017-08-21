import { createAction, createReducer } from 'redux-act';

export const activateSearch = createAction('Activate search bar');
export const searchChange = createAction('Change search bar text');
export const activateFilter = createAction('Activate song type filter');
export const clearFilters = createAction(
  'Clear search bar and song type filters',
);

const initialState = {
  searchText: null,
  activeFilter: null,
};

export default createReducer(
  {
    [activateSearch]: state => ({ ...state, searchText: '' }),
    [searchChange]: (state, payload) => ({ ...state, searchText: payload }),
    [activateFilter]: (state, payload) => ({ ...state, activeFilter: payload }),
    [clearFilters]: state => initialState,
  },
  initialState,
);
