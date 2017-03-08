import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CounterView from './CounterView';
import {NavigationActions} from 'react-navigation';
import * as CounterStateActions from '../counter/CounterState';

import rest from '../../utils/rest';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading']),
    songs: state.getIn(['songs', 'data']).toJS()
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      counterStateActions: bindActionCreators(CounterStateActions, dispatch),
      hello: () => console.log('Hello world!'),
      refresh: () => dispatch(rest.actions.songs())
    };
  }
)(CounterView);
