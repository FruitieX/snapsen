import React from 'react';
import { Image } from 'react-native';

import { createAction, createReducer } from 'redux-act';

import template from '../../books/template.json';
import tf from '../../books/tf.json';
import lauluwiki from '../../books/lauluwiki.json';

let defaultBooks = [tf, lauluwiki];

if (__DEV__) defaultBooks = [template, ...defaultBooks];

export const addBook = createAction('Add book to library');
export const deleteBook = createAction('Delete book from library');

const importBook = book => {
  book.key = book.id;

  book.songs.forEach(song => {
    song.bookId = book.id;
    song.bookTitle = book.title;
    song.key = `${book.key}/${song.id}`;
  });
};

defaultBooks.forEach(importBook);

export const bookImages = {};
defaultBooks.forEach(
  book =>
    (bookImages[book.key] = (
      <Image source={book.image} style={{ height: 40, width: 40 }} />
    )),
);

const initialState = {};
defaultBooks.forEach(book => (initialState[book.key] = book));

export default createReducer(
  {
    [addBook]: (state, book) => ({ ...state, [book.key]: book }),
    [deleteBook]: (state, book) => {
      const newState = { ...state };
      delete newState[book.id];
      return newState;
    },
  },
  initialState,
);
