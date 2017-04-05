import React, {Component} from 'react';

import {
  Container,
  Content,
  Icon,
  Button,
  Body,
  Thumbnail,
  Left,
  Right,
  ListItem,
  List,
  Text,
  Spinner,
  Header,
  Title
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongsView extends Component {
  static displayName = 'SongsView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  /*
  componentDidMount() {
    const {refresh} = this.props;

    refresh();
  }
  */

  renderRow = song => {
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

  render() {
    //const {throttledRefresh, changeSearch, clearSearch, searchText} = this.props;
    const {books} = this.props;

    let songs = [];
    books.forEach((book, index) => {
      const newSongs = book.data.songs.map(song => ({
        ...song,
        bookId: index
      }));

      songs = [...songs, ...newSongs];
    });

    return (
      <Container>
        <Header>
          <Body>
            <Title>Sånger</Title>
          </Body>
          <Right>
            <Button transparent>
                <Icon name='search' />
            </Button>
            <Button transparent>
                <Icon
                  name='settings'
                  onPress={() => this.props.navigation.navigate('SongBooks')} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List dataArray={songs} renderRow={this.renderRow} />
        </Content>
      </Container>
    );
  }
}

export default SongsView;
