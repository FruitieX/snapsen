import {connect} from 'react-redux';
import SongDetailsView from './SongDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    song: {
      ...state.songDetails.data,
      ...ownProps.navigation.state.params.song
    },
    loading: state.songDetails.loading
  }),
  dispatch => ({
    getSongDetails(songId) {
      dispatch(rest.actions.songDetails({songId}));
    }
  }))(SongDetailsView);
