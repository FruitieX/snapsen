import {connect} from 'react-redux';
import SongBookDetailsView from './SongBookDetailsView';

export default connect(
  (state, ownProps) => ({
    book: ownProps.navigation.state.params.book
  }))(SongBookDetailsView);
