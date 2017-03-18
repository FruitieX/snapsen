import React, {Component} from 'react';

import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';

  render() {
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigatorState
          })
        }
      />
    );
  }
}

export default NavigatorView;
