import React, {Component} from 'react';
import forIn from 'lodash/forIn';

import { Keyboard, View } from 'react-native';
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
  Title
} from 'native-base';

import colors from '../../utils/colors';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongsView extends Component {
  static displayName = 'SongsView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  renderRow = song => {
    const {books} = this.props;
    const book = books[song.url];

    const badgeColor = colors[song.type] || colors['default'];

    return (
      <ListItem
        button
        avatar
        key={song.id}
        onPress={() => {
          Keyboard.dismiss();
          this.props.navigation.navigate('SongDetails', {
            primaryColor: book.primaryColor,
            song
          });
        }}
      >
        <Left>
          <Thumbnail source={{uri: book.image}}/>
        </Left>
        <Body>
          <Text numberOfLines={1}>{song.title}</Text>
          <Text note numberOfLines={1}>{book.title}, sida {song.page}</Text>
          <Badge style={{backgroundColor: badgeColor}}>
            <Text>{song.type}</Text>
          </Badge>
        </Body>
        <Right>
          <Icon name='arrow-forward' />
        </Right>
      </ListItem>
    );
  };

  getSongsFromBooks(books) {
    let songs = [];

    forIn(books, (book, url) => {
      const newSongs = book.songs.map(song => ({
        ...song,
        url
      }));

      songs = [...songs, ...newSongs];
    });

    return songs;
  }

  render() {
    const {
      activateSearch,
      changeSearch,
      searchText,
      activateFilter,
      clearFilters,
      activeFilter
    } = this.props;

    const {books} = this.props;

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

    const placeholderSearchText = activeFilter ? `Sök inom "${activeFilter}"` : 'Sök sånger';

    const header = searchText === null
      ? (
        <Header>
          <Body>
            <Title>Sånger</Title>
          </Body>
          <Right>
            <Button transparent onPress={activateSearch}>
              <Icon name='search' />
            </Button>
            <Button transparent onPress={() => this.props.navigation.navigate('SongBooks')}>
              <Icon name='settings' />
            </Button>
          </Right>
        </Header>
      ) : (
        <Header searchBar rounded>
          <Left>
            <Button transparent onPress={clearFilters}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Item style={{flex: 4}}>
            <Input autoFocus placeholder={placeholderSearchText} value={searchText} onChangeText={changeSearch} />
          </Item>
        </Header>
      );

    const body = (searchText === '' && !activeFilter)
      ? (
        <Card>
          <CardItem>
            <Body>
              <Text>Sångtyper:</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              { Object.keys(types).map((type, index) => {
                const color = colors[type] || colors['default'];

                return (
                  <Button style={{margin: 4, backgroundColor: color}} rounded key={index} onPress={
                    () => activateFilter(type)
                  }>
                    <Text>{type}</Text>
                  </Button>
                );
              })}
              </View>
            </Body>
          </CardItem>
        </Card>
      ) : (
        <List keyboardShouldPersistTaps='always' dataArray={songs} renderRow={this.renderRow} />
      );

    const color = colors[activeFilter] || colors['default'];
    const displayFilter = activeFilter
      ? (
        <Badge primary style={{margin: 8, backgroundColor: color}}><Text>{activeFilter}</Text></Badge>
      ) : null;

    return (
      <Container>
        { header }
        { displayFilter }
        <Content keyboardShouldPersistTaps='always'>
          { body }
        </Content>
      </Container>
    );
  }
}

export default SongsView;
