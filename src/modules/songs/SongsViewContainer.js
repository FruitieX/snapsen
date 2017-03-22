import {connect} from 'react-redux';
import SongsView from './SongsView';
import debounce from 'lodash/throttle';

import rest from '../../utils/rest';

const refresh = (dispatch, filter) => dispatch(rest.actions.songs({filter}));

export default connect(
  state => ({
    songs: state.songs.data,
    loading: state.songs.loading
  }),
  dispatch => ({
    refresh: (filter) => refresh(dispatch, filter),
    throttledRefresh: debounce((filter) => refresh(dispatch, filter), 500, {leading: true})
  })
)(SongsView);
