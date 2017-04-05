import {connect} from 'react-redux';
import SongBooksView from './SongBooksView';
import debounce from 'lodash/throttle';
import {clearSearch, searchChange} from '../../actions/appActions';

import rest from '../../utils/rest';

const refresh = (dispatch, filter) => dispatch(rest.actions.songs({filter}));

export default connect(
  state => ({
    books: state.books
  }),
  dispatch => ({
    refresh: (filter) => refresh(dispatch, filter),
    changeSearch: (text) => dispatch(searchChange(text)),
    clearSearch: () => dispatch(clearSearch()),
    throttledRefresh: debounce((filter) => refresh(dispatch, filter), 500, {leading: true})
  })
)(SongBooksView);
