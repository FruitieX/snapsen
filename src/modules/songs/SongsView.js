import React, {Component} from 'react';

import {
  FlatList
} from 'react-native';

import {
  Container,
  Content,
  Icon,
  Button,
  Body,
  Thumbnail,
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

import {NBFlatList} from './nbflatlist';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongsView extends Component {
  static displayName = 'SongsView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  renderRow = ({item}) => {
    const song = item;
    const {books} = this.props;

    const book = books[song.bookId].data;

    return (
      <ListItem
        button
        avatar
        key={song.id}
        onPress={() => this.props.navigation.navigate('SongDetails', {
          primaryColor: book.primaryColor,
          song
        })}
      >
        <Left>
          <Thumbnail source={{uri: book.imageUrl}}/>
        </Left>
        <Body>
          <Text numberOfLines={1}>{song.title}</Text>
          <Text note numberOfLines={1}>{book.title}, sida {song.page}</Text>
        </Body>
        <Right>
          <Icon name='arrow-forward' />
        </Right>
      </ListItem>
    );
  };

  getSongsFromBooks(books) {
    let songs = [];

    books.forEach((book, index) => {
      const newSongs = book.data.songs.map(song => ({
        ...song,
        bookId: index
      }));

      songs = [...songs, ...newSongs];
    });

    return songs;
  }

  render() {
    const {activateSearch, changeSearch, clearSearch, searchText} = this.props;
    const {books} = this.props;

    let songs = this.getSongsFromBooks(books);

    if (searchText) {
      const filter = searchText.toLowerCase();
      songs = songs.filter(song => {
        const title = song.title.toLowerCase();
        return title.indexOf(filter) !== -1;
      });
    }

    // daaaaamn react native is sloooooow with long lists, especially in debug mode
    if (__DEV__) {
      songs = songs.slice(0, 20);
    }

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
          <Left style={{flex: 1}}>
            <Button transparent onPress={clearSearch}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Item style={{flex: 4}}>
            <Input placeholder='Sök sånger' value={searchText} onChangeText={changeSearch} />
          </Item>
        </Header>
      );

    return (
      <Container>
        <Content>
          { header }
          <NBFlatList keyExtractor={song => song.title} dataArray={songs} renderRow={this.renderRow} />
        </Content>
      </Container>
    );
  }
}

export default SongsView;
