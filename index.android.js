import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {clearSearch} from './src/modules/songs/SongsState';

class Snapsen extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const navigatorState = store.getState().navigatorState;
    const currentStackScreen = navigatorState.index;

    if (currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    if (store.getState().songsState.searchText !== null) {
      store.dispatch(clearSearch());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Snapsen', () => Snapsen);
