import {connect} from 'react-redux';
import SongsView from './SongsView';
import {activateSearch, clearSearch, searchChange} from './SongsState';

export default connect(
  state => ({
    books: state.books,
    searchText: state.songsState.searchText
  }),
  dispatch => ({
    activateSearch: () => dispatch(activateSearch()),
    changeSearch: (text) => dispatch(searchChange(text)),
    clearSearch: () => dispatch(clearSearch())
  })
)(SongsView);
