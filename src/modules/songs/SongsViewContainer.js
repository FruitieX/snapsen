import {connect} from 'react-redux';
import SongsView from './SongsView';

import rest from '../../utils/rest';

export default connect(
  state => ({
    songs: state.getIn(['songs']).toJS()
  }),
  dispatch => {
    return {
      refresh: () => dispatch(rest.actions.songs())
    };
  }
)(SongsView);
