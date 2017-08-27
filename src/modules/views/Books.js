import React, { Component } from 'react';
import forIn from 'lodash/forIn';

import { FlatList, Keyboard, View } from 'react-native';

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import colors from '../../utils/colors';
import BookItem from '../../components/BookItem';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  navigate: (view, options) =>
    dispatch(NavigationActions.navigate(view, options)),
});

class BooksView extends Component {
  onPressBook = book => {
    Keyboard.dismiss();
    this.props.navigation.navigate('BookDetails', { book });
  };

  renderItem = ({ item }) =>
    <BookItem book={item} onPress={this.onPressBook} />;

  renderBookList = books =>
    <FlatList data={books} renderItem={this.renderItem} />;

  render = () =>
    this.renderBookList(
      Object.keys(this.props.books).map(key => this.props.books[key]),
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksView);
