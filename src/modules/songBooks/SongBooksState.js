export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

import data from '../../../books/tf.json';

export function addBook(book) {
  return {
    type: ADD_BOOK,
    payload: book
  };
}

export function deleteBook(url) {
  return {
    type: DELETE_BOOK,
    payload: url
  };
}

const initialState = {
  'https://fruitiex.github.io/snapsen/books/tf.json': data
};

export default function booksState(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_BOOK: {
      return {
        ...state,
        [action.payload.url]: action.payload.data
      };
    }
    default:
      return state;
  }
}
