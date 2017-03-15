import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import themeVariables from '../../../native-base-theme/variables/platform';

import SongsViewContainer from '../songs/SongsViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
import SongDetailsViewContainer from '../songDetails/SongDetailsViewContainer';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Songs: {screen: SongsViewContainer},
  SongDetails: {screen: SongDetailsViewContainer},
  Color: {screen: ColorViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: themeVariables.topTabBarActiveTextColor,
        indicatorStyle: {backgroundColor: themeVariables.topTabBarActiveTextColor},
        style: {backgroundColor: themeVariables.tabDefaultBg}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  header: {
    visible: false
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  InfiniteColorStack: {screen: ColorViewContainer}
});

export default AppNavigator;
