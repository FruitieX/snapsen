import {connect} from 'react-redux';
import SongDetailsView from './SongDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    songDetails: state.getIn(['songDetails']).toJS(),
    songId: 1
  }),
  dispatch => ({
    getSongDetails(songId) {
      dispatch(rest.actions.songDetails({songId}));
    }
  }))(SongDetailsView);
