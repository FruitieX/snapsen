import React from 'react';
import PropTypes from 'prop-types';
import {
  StackNavigator,
  DrawerNavigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from './Header';
import Drawer from './Drawer';

// ## View imports ##
import SongsView from './views/Songs';
import SongDetailsView from './views/SongDetails';
import BooksView from './views/Books';
import BookDetailsView from './views/BookDetails';
import SettingsView from './views/Settings';

const DrawerNavigatorConfig = {
  drawerWidth: 300,
  contentComponent: props => <Drawer {...props} />,
};

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
const BooksNavigator = StackNavigator(
  {
    Books: { screen: BooksView },
    BookDetails: {
      screen: BookDetailsView,
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
    BooksNavigator: { screen: BooksNavigator },
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
