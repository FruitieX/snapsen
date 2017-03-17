import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';

import rest from '../utils/rest';
import appReducers from '../reducers';

const reducers = {
  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,
  ...appReducers,
  ...rest.reducers
};

const namespacedReducer = combineReducers(reducers);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  return loop(nextState, effects);
}
