import React, {Component} from 'react';

import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';

  render() {
    return (
      <AppNavigator/>
    );
  }
}

export default NavigatorView;
