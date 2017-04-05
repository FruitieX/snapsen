import {connect} from 'react-redux';
import SongBooksView from './SongBooksView';

export default connect(
  state => ({
    books: state.books
  })
)(SongBooksView);
