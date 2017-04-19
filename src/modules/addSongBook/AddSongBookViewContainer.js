import {connect} from 'react-redux';
import AddSongBookView from './AddSongBookView';
import rest from '../../utils/rest';
import {addBook} from '../songBooks/SongBooksState';

export default connect(
  state => ({
    book: state.downloadBook.data,
    loading: state.downloadBook.loading
  }),
  dispatch => ({
    download: url => dispatch(rest.actions.downloadBook({url})),
    add: book => dispatch(addBook(book))
  })
)(AddSongBookView);
