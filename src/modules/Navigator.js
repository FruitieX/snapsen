import React from 'react';
import PropTypes from 'prop-types';
import {
  StackNavigator,
  DrawerNavigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Toolbar, Drawer, Avatar } from 'react-native-material-ui';

// ## View imports ##
import SongsView from './views/Songs';
import SongDetailsView from './views/SongDetails';
import SettingsView from './views/Settings';

const DrawerNavigatorConfig = {
  drawerWidth: 300,
  contentComponent: props =>
    <Drawer>
      <Drawer.Header>
        {/* <Drawer.Header.Account
          avatar={<Avatar text={'A'} />}
          footer={{
            dense: true,
            centerElement: {
              primaryText: 'Reservio',
              secondaryText: 'business@email.com',
            },
            rightElement: 'arrow-drop-down',
          }}
        /> */}
      </Drawer.Header>
      <Drawer.Section
        divider
        items={[
          {
            icon: 'music-note',
            value: 'Songs',
            active: props.activeItemKey === 'SongsNavigator',
            onPress: () => props.navigation.navigate('SongsNavigator'),
          },
          {
            icon: 'book',
            value: 'Songbooks',
            active: props.activeItemKey === 'SongBooksNavigator',
            onPress: () => props.navigation.navigate('SongBooksNavigator'),
          },
        ]}
      />
      <Drawer.Section
        items={[
          {
            icon: 'settings',
            value: 'Settings',
            active: props.activeItemKey === 'SettingsNavigator',
            onPress: () => props.navigation.navigate('SettingsNavigator'),
          },
        ]}
      />
    </Drawer>,
};

class Header extends React.Component {
  canNavigateBack = () => {
    if (
      ['Songs', 'SongBooks', 'Settings'].includes(
        this.props.currentNavigation.state.routeName,
      )
    ) {
      return false;
    }

    return true;
  };

  headerOnLeftPress = () => {
    if (this.canNavigateBack()) {
      this.props.currentNavigation.goBack();
    } else {
      this.props.currentNavigation.navigate('DrawerOpen');
    }
  };

  headerLeftElement = () => (this.canNavigateBack() ? 'arrow-back' : 'menu');

  getTitle = () =>
    this.props.getScreenDetails(this.props.scene).options.title ||
    this.props.currentNavigation.state.routeName;

  render = () =>
    <Toolbar
      onLeftElementPress={this.headerOnLeftPress}
      leftElement={this.headerLeftElement()}
      centerElement={this.getTitle()}
      searchable={{
        autoFocus: true,
        placeholder: 'Search',
      }}
    />;
}

const StackNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    header: props => <Header currentNavigation={navigation} {...props} />,
  }),
};

// This bunch of navigators here is a hack to work around:
// https://github.com/react-community/react-navigation/issues/843
const SongsNavigator = StackNavigator(
  {
    Songs: { screen: SongsView },
    SongDetails: {
      screen: SongDetailsView,
      navigationOptions: { title: 'Info' },
    },
  },
  StackNavigatorConfig,
);
const SettingsNavigator = StackNavigator(
  {
    Settings: { screen: SettingsView },
  },
  StackNavigatorConfig,
);

export const DrawerView = DrawerNavigator(
  {
    SongsNavigator: { screen: SongsNavigator },
    SettingsNavigator: { screen: SettingsNavigator },
  },
  DrawerNavigatorConfig,
);

export const Root = StackNavigator(
  {
    // ## StackNavigator views ##
    Drawer: { screen: DrawerView },
  },
  { headerMode: 'none' },
);

// Throw a helpful error message when the DrawerNavigator couldn't be found by name
const missingDrawerNavigator = `Error while handling back button press:

Route with name 'Drawer' was not found in the root of the navigation state.

If you have moved the 'Drawer' route, you need to:
  * Edit src/modules/Navigator.js
  * Update handleBackButton() so it knows
    where to find your DrawerNavigator`;

export const handleBackButton = ({ navigatorState }, dispatch) => {
  const drawerNavigator = navigatorState.routes.find(
    route => route.routeName === 'Drawer',
  );
  const drawerClose = drawerNavigator.routes.find(
    route => route.routeName === 'DrawerClose',
  );

  const drawerScreenIndex = drawerClose.index;
  const drawerScreen = drawerClose.routes[drawerScreenIndex];

  if (drawerScreenIndex !== 0 || drawerScreen.index !== 0) {
    dispatch(NavigationActions.back());
    return true;
  }

  // otherwise let OS handle the back button action
  return false;
};

const mapStateToProps = ({ navigatorState }) => ({ navigatorState });

export class NavigatorView extends React.Component {
  render = () =>
    <Root
      navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigatorState,
      })}
    />;
}

export default connect(mapStateToProps)(NavigatorView);
