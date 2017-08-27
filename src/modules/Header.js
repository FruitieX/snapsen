import React from 'react';
import { View } from 'react-native';
import { Toolbar, COLOR } from 'react-native-material-ui';

import { StatusBarPadding } from '../components/styled';

export default class Header extends React.Component {
  canNavigateBack = () =>
    !['Songs', 'Books', 'Settings'].includes(
      this.props.currentNavigation.state.routeName,
    );

  isSearchable = () =>
    ['Songs'].includes(this.props.currentNavigation.state.routeName);

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

  render = () => {
    const params = this.props.currentNavigation.state.params;
    const backgroundColor =
      params && params.primaryColor ? params.primaryColor : COLOR.brown300;
    const secondaryColor =
      params && params.secondaryColor ? params.secondaryColor : COLOR.white;

    return (
      <View>
        <StatusBarPadding backgroundColor={backgroundColor} />
        {/* <StatusBar backgroundColor={backgroundColor} /> */}
        <Toolbar
          onLeftElementPress={this.headerOnLeftPress}
          leftElement={this.headerLeftElement()}
          centerElement={this.getTitle()}
          isSearchActive={this.props.searchText}
          searchable={
            this.isSearchable()
              ? {
                  autoFocus: true,
                  placeholder: 'Search',
                  onSearchPressed: this.props.activateSearch,
                  onChangeText: this.props.changeSearch,
                }
              : undefined
          }
          style={{
            container: { backgroundColor },
            titleText: { color: secondaryColor },
          }}
        />
      </View>
    );
  };
}
