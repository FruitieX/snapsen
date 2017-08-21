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

const importBook = book =>
  book.songs.forEach(song => {
    song.bookUrl = book.url;
    song.key = `${book.url}/${song.id}`;
  });

defaultBooks.forEach(importBook);

const initialState = {};
defaultBooks.forEach(book => (initialState[book.url] = book));

export const bookImages = {};

export default createReducer(
  {
    [addBook]: (state, book) => ({ ...state, [book.url]: book }),
    [deleteBook]: (state, book) => {
      const newState = { ...state };
      delete newState[book.url];
      return newState;
    },
    '@@INIT': state => {
      // TODO: this is a little bit awful to do in here
      Object.entries(state).forEach(
        ([bookName, book]) =>
          (bookImages[bookName] = (
            <Image source={book.image} style={{ height: 40, width: 40 }} />
          )),
      );

      return state;
    },
  },
  initialState,
);
