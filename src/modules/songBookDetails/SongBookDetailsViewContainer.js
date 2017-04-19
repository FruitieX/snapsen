import {connect} from 'react-redux';
import SongBookDetailsView from './SongBookDetailsView';
import {deleteBook, addBook} from '../songBooks/SongBooksState';

export default connect(
  (state, ownProps) => ({
    book: ownProps.navigation.state.params.book
  }),
  dispatch => ({
    deleteBook: url => dispatch(deleteBook(url)),
    updateBook: book => dispatch(addBook(book))
  }))(SongBookDetailsView);
