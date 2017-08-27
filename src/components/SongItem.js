import React from 'react';
import colors from '../utils/colors';

import { Image, View, Text } from 'react-native';

import { ListItem, Avatar } from 'react-native-material-ui';

import { bookImages } from '../state/books';
/*
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
*/

export default class SongItem extends React.PureComponent {
  handlePress = () => this.props.onPress(this.props.song);

  /*
    <Image
      source={this.props.song.book.image}
      resizeMode="contain"
      style={{
        height: 40,
        width: 40,
      }}
    />;
    */

  render = () => {
    const { song, book } = this.props;
    const badgeColor = colors[song.type] || colors['default'];

    return (
      <ListItem
        divider
        leftElement={
          <Avatar
            image={bookImages[song.bookUrl]}
            style={{ container: { backgroundColor: 'transparent' } }}
          />
        }
        centerElement={{
          primaryText: song.title,
          secondaryText: `${book.title} (p. ${song.page})`,
          tertiaryText: song.type.join(', '),
        }}
        onPress={this.props.onPress && this.handlePress}
      />
    );

    /*
    return (
      <ListItem button avatar key={song.id} onPress={this.props.onPress}>
        <Left>
          <Thumbnail source={{ uri: book.image }} />
        </Left>
        <Body>
          <Text numberOfLines={1}>
            {song.title}
          </Text>
          <Text note numberOfLines={1}>
            {book.title}, sida {song.page}
          </Text>
          <Badge style={{ backgroundColor: badgeColor }}>
            <Text>
              {song.type}
            </Text>
          </Badge>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
    */
  };
}
