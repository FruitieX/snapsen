import React from 'react';
import colors from '../utils/colors';

import { Image, View, Text } from 'react-native';

import { ListItem, Avatar } from 'react-native-material-ui';

import { bookImages } from '../state/books';

export default class BookItem extends React.PureComponent {
  handlePress = () => this.props.onPress(this.props.book);

  render = () => {
    const { book } = this.props;

    return (
      <ListItem
        divider
        leftElement={
          <Avatar
            image={bookImages[book.url]}
            style={{ container: { backgroundColor: 'transparent' } }}
          />
        }
        centerElement={{
          primaryText: book.title,
          secondaryText: `${book.description}`,
          tertiaryText: `Author: ${book.author.name}`,
        }}
        onPress={this.props.onPress && this.handlePress}
      />
    );
  };
}
