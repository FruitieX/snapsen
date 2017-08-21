import { combineReducers } from 'redux';

// ## Reducer Imports ##
import navigator from '../state/navigator';
import counter from '../state/counter';
import songsView from '../state/songsView';
import books from '../state/books';

export default combineReducers({
  // ## Reducers ##

  // Navigator state
  navigatorState: navigator,

  // Counter state
  counter,

  // Songs view state
  songsView,

  // Stored books
  books,
});
