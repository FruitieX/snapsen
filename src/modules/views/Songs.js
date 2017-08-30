import React, { Component } from 'react';

import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Card } from 'react-native-material-ui';

import { connect } from 'react-redux';
import {
  activateSearch,
  clearFilters,
  searchChange,
  activateFilter,
} from '../../state/filters';

import Filters from '../Filters';

import SongItem from '../../components/SongItem';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

const mapStateToProps = state => ({
  books: state.books,
  searchText: state.filters.searchText,
  typeFilter: state.filters.type,
  bookFilter: state.filters.book,
  sortBy: state.filters.sortBy,
});

const mapDispatchToProps = dispatch => ({
  activateSearch: () => dispatch(activateSearch()),
  changeSearch: text => dispatch(searchChange(text)),
  activateFilter: type => dispatch(activateFilter(type)),
  clearFilters: () => dispatch(clearFilters()),
  navigate: (view, options) =>
    dispatch(NavigationActions.navigate(view, options)),
});

const sortByTitle = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }

  return 0;
};

const sortByBook = (a, b) => {
  if (a.bookTitle < b.bookTitle) {
    return -1;
  }
  if (a.bookTitle > b.bookTitle) {
    return 1;
  }

  return sortByTitle(a, b);
};

const sortByType = (a, b) => {
  const aType = a.type.join(', ');
  const bType = b.type.join(', ');

  if (aType < bType) {
    return -1;
  }
  if (aType > bType) {
    return 1;
  }

  return sortByTitle(a, b);
};

const sortByPage = (a, b) => {
  return a.page - b.page;
};

class SongsView extends Component {
  onPressSong = song => {
    Keyboard.dismiss();
    this.props.navigation.navigate('SongDetails', {
      song,
      primaryColor: this.props.books[song.bookId].primaryColor,
      secondaryColor: this.props.books[song.bookId].secondaryColor,
    });
  };

  renderItem = ({ item }) =>
    <SongItem
      book={this.props.books[item.bookId]}
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
      typeFilter,
      bookFilter,
    } = this.props;

    // TODO: filter by more fields than title
    if (searchText) {
      songs = songs.filter(song => {
        const title = song.title.toLowerCase();
        return title.includes(searchText.toLowerCase());
      });
    }

    if (bookFilter) {
      songs = songs.filter(song => song.bookId === bookFilter);
    }

    if (typeFilter) {
      songs = songs.filter(song => song.type.includes(typeFilter));
    }

    return songs;
  };

  sortSongs = songs => {
    const { sortBy } = this.props;

    if (sortBy === 'book') {
      return songs.sort(sortByBook);
    } else if (sortBy === 'title') {
      return songs.sort(sortByTitle);
    } else if (sortBy === 'page') {
      return songs.sort(sortByPage);
    } else if (sortBy === 'type') {
      return songs.sort(sortByType);
    }

    return songs;
  };

  songKeyExtractor = song => song;

  getItemLayout = (data, index) => ({
    length: 88,
    offset: 88 * index,
    index,
  });

  renderSongList = songs =>
    <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding">
      <FlatList
        data={songs}
        renderItem={this.renderItem}
        ListHeaderComponent={Filters}
        getItemLayout={this.getItemLayout}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      />
    </KeyboardAvoidingView>;

  render = () =>
    this.renderSongList(
      this.sortSongs(
        this.filterSongs(this.getSongsFromBooks(this.props.books)),
      ),
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsView);
