import AppNavigator from './Navigator';

export default (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};
