import { combineReducers } from 'redux';

// ## Reducer Imports ##
import navigator from '../state/navigator';
import filters from '../state/filters';
import books from '../state/books';
import notes from '../state/notes';

export default combineReducers({
  // ## Reducers ##

  // Navigator state
  navigatorState: navigator,

  // Songs view state
  filters,

  // Stored books
  books,

  // Song notes
  notes,
});
