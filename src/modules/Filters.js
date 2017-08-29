import React, { Component } from 'react';

import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Avatar, Card } from 'react-native-material-ui';

import { connect } from 'react-redux';
import {
  activateSearch,
  clearFilters,
  searchChange,
  activateTypeFilter,
  activateBookFilter,
} from '../state/filters';
import { bookImages } from '../state/books';
import {
  Title,
  Padding,
  BookFilter,
  BookFilterTitle,
  TypeBadge,
  Type,
  FilterContainer,
} from '../components/styled';

const getTypesFromBooks = (books, bookFilter) => {
  let bookArray = Object.keys(books).map(key => books[key]);

  if (bookFilter) {
    bookArray = bookArray.filter(book => book.id === bookFilter);
  }

  const types = [];

  bookArray.forEach(book =>
    book.songs.forEach(song =>
      song.type.forEach(name => {
        if (!types.find(type => type.name === name)) {
          types.push({
            name: name,
            color: book.types[name] || book.primaryColor,
          });
        }
      }),
    ),
  );

  return types;
};

// TODO: reselect
const mapStateToProps = state => ({
  books: Object.keys(state.books).map(key => state.books[key]),
  types: getTypesFromBooks(state.books, state.filters.book),
  searchText: state.filters.searchText,
  typeFilter: state.filters.type,
  bookFilter: state.filters.book,
});

const mapDispatchToProps = dispatch => ({
  activateSearch: () => dispatch(activateSearch()),
  changeSearch: text => dispatch(searchChange(text)),
  activateBookFilter: book => dispatch(activateBookFilter(book.id)),
  activateTypeFilter: type => dispatch(activateTypeFilter(type.name)),
  clearFilters: () => dispatch(clearFilters()),
  navigate: (view, options) =>
    dispatch(NavigationActions.navigate(view, options)),
});

class Filters extends Component {
  renderSongbook = ({ item }) =>
    <TouchableOpacity onPress={() => this.props.activateBookFilter(item)}>
      <BookFilter
        active={!this.props.bookFilter || this.props.bookFilter === item.id}
      >
        <Avatar
          image={bookImages[item.id]}
          style={{ container: { backgroundColor: 'transparent' } }}
        />
        <BookFilterTitle>
          {item.title}
        </BookFilterTitle>
      </BookFilter>
    </TouchableOpacity>;

  renderType = ({ item }) =>
    <TouchableOpacity onPress={() => this.props.activateTypeFilter(item)}>
      <TypeBadge
        active={!this.props.typeFilter || this.props.typeFilter === item.name}
        backgroundColor={item.color}
      >
        <Type>
          {item.name}
        </Type>
      </TypeBadge>
    </TouchableOpacity>;

  render = () =>
    <FilterContainer>
      <Card>
        <Padding>
          <Title>Filter by songbook</Title>
        </Padding>
        <FlatList
          data={this.props.books}
          renderItem={this.renderSongbook}
          horizontal
        />
      </Card>
      <Card>
        <Padding>
          <Title>Filter by song type</Title>
        </Padding>
        <FlatList
          data={this.props.types}
          renderItem={this.renderType}
          keyExtractor={item => item.name}
          horizontal
        />
      </Card>
    </FilterContainer>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
