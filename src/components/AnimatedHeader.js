import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connectStyle} from '@shoutem/theme';
import mapPropsToStyleNames from 'native-base/dist/src/Utils/mapPropsToStyleNames';
import variable from '../../native-base-theme/variables/platform';

class AnimatedHeader extends Component {
  static contextTypes = {
    theme: React.PropTypes.object
  }

  render() {
    const variables = this.context.theme
      ? this.context.theme['@@shoutem.theme/themeStyle'].variables
      : variable;

    const platformStyle = variables.platformStyle;

    let barStyle = this.props.iosBarStyle
      ? this.props.iosBarStyle
      : platformStyle === 'material';

    barStyle = barStyle
      ? 'light-content'
      : variables.iosStatusbar;

    return (
      <View>
        <StatusBar
          animated
          backgroundColor={this.props.androidStatusBarColor
            ? this.props.androidStatusBarColor
            : variables.statusBarColor
          }
          barStyle={barStyle}
        />
        <View ref={c => (this._root = c)} {...this.props} />
      </View>
    );
  }
}

AnimatedHeader.propTypes = {
  ...View.propTypes,
  style: React.PropTypes.object,
  searchBar: React.PropTypes.bool,
  rounded: React.PropTypes.bool
};

const StyledHeader = connectStyle('NativeBase.Header', {}, mapPropsToStyleNames)(AnimatedHeader);
export {
  StyledHeader as AnimatedHeader
};
