import React from 'react';
import { View } from 'react-native';
import { Toolbar, COLOR } from 'react-native-material-ui';

import { connect } from 'react-redux';
import {
  activateSearch,
  clearFilters,
  searchChange,
  activateFilter,
} from '../state/songsView';
import { StatusBarPadding } from '../components/styled';

const mapStateToProps = state => ({
  books: state.books,
  searchText: state.songsView.searchText,
  activeFilter: state.songsView.activeFilter,
});

const mapDispatchToProps = dispatch => ({
  activateSearch: () => dispatch(activateSearch()),
  changeSearch: text => dispatch(searchChange(text)),
  activateFilter: type => dispatch(activateFilter(type)),
  clearFilters: () => dispatch(clearFilters()),
  navigate: (view, options) =>
    dispatch(NavigationActions.navigate(view, options)),
});

export class Header extends React.Component {
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
    let secondaryColor =
      params && params.secondaryColor ? params.secondaryColor : COLOR.white;

    return (
      <View>
        <StatusBarPadding backgroundColor={backgroundColor} />
        {/* <StatusBar backgroundColor={backgroundColor} /> */}
        <Toolbar
          onLeftElementPress={this.headerOnLeftPress}
          leftElement={this.headerLeftElement()}
          centerElement={this.getTitle()}
          isSearchActive={this.isSearchable() && this.props.searchText !== null}
          searchable={
            this.isSearchable()
              ? {
                  autoFocus: true,
                  placeholder: 'Search',
                  onSearchPressed: this.props.activateSearch,
                  onSearchClosed: this.props.clearFilters,
                  onChangeText: this.props.changeSearch,
                }
              : undefined
          }
          style={{
            container: { backgroundColor },
            titleText:
              this.props.searchText === null
                ? { color: secondaryColor }
                : undefined,
          }}
        />
      </View>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
