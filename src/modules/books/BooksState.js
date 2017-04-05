export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

import data from '../../../books/tf.json';

export function addBook(book) {
  return {
    type: ADD_BOOK,
    payload: book
  };
}

export function deleteBook(index) {
  return {
    type: DELETE_BOOK,
    payload: index
  };
}

const initialState = [
  {
    url: 'https://fruitiex.github.io/snapsen/books/tf.json',
    data
  }
];

export default function booksState(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_BOOK: {
      const books = [
        ...state.books,
        action.payload
      ];

      return {
        ...state,
        books
      };
    }
    default:
      return state;
  }
}
