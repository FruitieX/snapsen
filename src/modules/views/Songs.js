import React, { Component } from 'react';
import forIn from 'lodash/forIn';

import { FlatList, Keyboard, KeyboardAvoidingView, View } from 'react-native';
import {
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Button,
  Body,
  Thumbnail,
  Badge,
  Left,
  Right,
  Item,
  Input,
  ListItem,
  List,
  Text,
  Header,
  Title,
} from 'native-base';

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import {
  activateSearch,
  clearFilters,
  searchChange,
  activateFilter,
} from '../../state/songsView';

import colors from '../../utils/colors';
import SongItem from '../../components/SongItem';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

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

class SongsView extends Component {
  onPressSong = song => {
    Keyboard.dismiss();
    this.props.navigation.navigate('SongDetails', {
      song,
      primaryColor: this.props.books[song.bookUrl].primaryColor,
      secondaryColor: this.props.books[song.bookUrl].secondaryColor,
    });
  };

  renderItem = ({ item }) =>
    <SongItem
      book={this.props.books[item.bookUrl]}
      song={item}
      onPress={this.onPressSong}
    />;

  getSongsFromBooks = books =>
    Object.entries(books).reduce((songs, [bookName, book]) => {
      book.songs.forEach(song => {
        //song.book = book; // TODO: this may slow down debug mode a lot?
        songs.push(song);
      });
      return songs;
    }, []);

  filterSongs = songs => {
    const {
      activateSearch,
      changeSearch,
      searchText,
      activateFilter,
      clearFilters,
      activeFilter,
    } = this.props;

    // TODO: filter by more fields than title
    if (searchText) {
      songs = songs.filter(song => {
        const title = song.title.toLowerCase();
        return title.includes(searchText.toLowerCase());
      });
    }

    if (activeFilter) {
      songs = songs.filter(song => song.type === activeFilter);
    }

    return songs;
  };

  songKeyExtractor = song => song;

  renderSongList = songs =>
    <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding">
      <FlatList data={songs} renderItem={this.renderItem} />
    </KeyboardAvoidingView>;

  render = () =>
    this.renderSongList(
      this.filterSongs(this.getSongsFromBooks(this.props.books)),
    );
  /*
  render = () => {
    const {
      activateSearch,
      changeSearch,
      searchText,
      activateFilter,
      clearFilters,
      activeFilter,
    } = this.props;

    const { books } = this.props;

    let songs = this.getSongsFromBooks(books);

    if (searchText) {
      const filter = searchText.toLowerCase();
      songs = songs.filter(song => {
        const title = song.title.toLowerCase();
        return title.indexOf(filter) !== -1;
      });
    }

    if (activeFilter) {
      songs = songs.filter(song => song.type === activeFilter);
    }

    const types = {};

    songs.forEach(song => (types[song.type] = true));

    // daaaaamn react native is sloooooow with long lists, especially in debug mode
    if (__DEV__) {
      songs = songs.slice(0, 20);
    }

    const placeholderSearchText = activeFilter
      ? `Sök inom "${activeFilter}"`
      : 'Sök sånger';

    const body =
      searchText === '' && !activeFilter
        ? <Card>
            <CardItem>
              <Body>
                <Text>Sångtyper:</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {Object.keys(types).map((type, index) => {
                    const color = colors[type] || colors['default'];

                    return (
                      <Button
                        style={{ margin: 4, backgroundColor: color }}
                        rounded
                        key={index}
                        onPress={() => activateFilter(type)}
                      >
                        <Text>
                          {type}
                        </Text>
                      </Button>
                    );
                  })}
                </View>
              </Body>
            </CardItem>
          </Card>
        : null;
    // : <FlatList data={songs} renderItem={this.renderItem} />;

    const color = colors[activeFilter] || colors['default'];
    const displayFilter = activeFilter
      ? <Badge primary style={{ margin: 8, backgroundColor: color }}>
          <Text>
            {activeFilter}
          </Text>
        </Badge>
      : null;

    return (
      <Container>
        { {displayFilter}}
        <Content keyboardShouldPersistTaps="always">
          {this.renderSongList()}
        </Content>
      </Container>
    );
  };
  */
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsView);
