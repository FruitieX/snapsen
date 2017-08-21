import React from 'react';
import { BackHandler, ActivityIndicator, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import persistStore from './src/utils/persist';
import Navigator, { handleBackButton } from './src/modules/Navigator';
import { Centered, AppContainer } from './src/components/styled';
import { ThemeProvider } from 'react-native-material-ui';
import { NativeModules } from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = { fontsLoaded: false, rehydrated: false };

  componentDidMount = async () => {
    persistStore(store, () => this.setState({ rehydrated: true }));
    BackHandler.addEventListener('hardwareBackPress', () =>
      handleBackButton(store.getState(), store.dispatch),
    );

    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ fontsLoaded: true });
  };

  isReady = () => this.state.rehydrated && this.state.fontsLoaded;

  renderActivityIndicator = () =>
    this.isReady()
      ? null
      : <Centered>
          <ActivityIndicator size="large" />
        </Centered>;

  renderApp = () =>
    this.isReady()
      ? <Provider store={store}>
          <Navigator />
        </Provider>
      : null;

  render = () =>
    <ThemeProvider>
      <AppContainer>
        {this.renderActivityIndicator()}
        {this.renderApp()}
      </AppContainer>
    </ThemeProvider>;
}
