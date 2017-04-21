import {connect} from 'react-redux';
import SongsView from './SongsView';
import {activateSearch, clearFilters, searchChange, activateFilter} from './SongsState';

export default connect(
  state => ({
    books: state.books,
    searchText: state.songsState.searchText,
    activeFilter: state.songsState.activeFilter
  }),
  dispatch => ({
    activateSearch: () => dispatch(activateSearch()),
    changeSearch: (text) => dispatch(searchChange(text)),
    activateFilter: (type) => dispatch(activateFilter(type)),
    clearFilters: () => dispatch(clearFilters())
  })
)(SongsView);
