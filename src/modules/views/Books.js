import React, { Component } from 'react';

import { FlatList, Keyboard, View, ToastAndroid } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { ViewContainer } from '../../components/styled';

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
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
  addBook = () =>
    ToastAndroid.show(
      'Songbook management is coming in a future release!\n\nIn the meantime, contact me at fruitiex@gmail.com to add more books or submit corrections.',
      ToastAndroid.LONG,
    );

  onPressBook = book => {
    Keyboard.dismiss();
    this.props.navigation.navigate('BookDetails', {
      book,
      primaryColor: book.primaryColor,
      secondaryColor: book.secondaryColor,
    });
  };

  renderItem = ({ item }) =>
    <BookItem book={item} onPress={this.onPressBook} />;

  renderBookList = books =>
    <ViewContainer>
      <FlatList data={books} renderItem={this.renderItem} />
      <ActionButton icon="add" onPress={this.addBook} />
    </ViewContainer>;

  render = () =>
    this.renderBookList(
      Object.keys(this.props.books).map(key => this.props.books[key]),
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksView);
