import { createAction, createReducer } from 'redux-act';

// Initial state
const initialState = {};

// Action creators
export const setNote = createAction('Set personal note for book');

// Reducer
export default createReducer(
  {
    [setNote]: (state, note) => ({
      ...state,
      [`${note.book.id}/${note.song.id}`]: note.text,
    }),
  },
  initialState,
);
