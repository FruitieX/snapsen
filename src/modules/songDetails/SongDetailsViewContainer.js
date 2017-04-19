import {connect} from 'react-redux';
import SongDetailsView from './SongDetailsView';
import rest from '../../utils/rest';

export default connect(
  (state, ownProps) => ({
    song: {
      ...ownProps.navigation.state.params.song
    },
    book: state.books[ownProps.navigation.state.params.song.url]
  }),
  dispatch => ({
    getSongDetails(songId) {
      dispatch(rest.actions.songDetails({songId}));
    }
  }))(SongDetailsView);
