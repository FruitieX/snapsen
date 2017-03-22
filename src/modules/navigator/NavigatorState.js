import AppNavigator from './Navigator';

export default (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);

  if (state) {
    const currentRoute = state.routes[state.index];
    const newRoute = newState.routes[newState.index];

    // Prevent stacking same type of views
    if (currentRoute.routeName === newRoute.routeName) {
      return state;
    }
  }

  return newState || state;
};
