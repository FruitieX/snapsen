import React, {Component} from 'react';

import {
  Container,
  Content,
  Icon,
  Button,
  Header,
  Item,
  Input,
  Body,
  Thumbnail,
  Left,
  Right,
  ListItem,
  List,
  Text,
  Spinner
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

  componentDidMount() {
    const {refresh} = this.props;

    refresh();
  }

  renderRow = song => (
    <ListItem
      button
      avatar
      key={song.id}
      onPress={() => this.props.navigation.navigate('SongDetails', {songId: song.id})}
    >
      <Left>
        <Thumbnail source={{uri: song.imageUrl}}/>
      </Left>
      <Body>
        <Text numberOfLines={1}>{song.title}</Text>
        <Text note numberOfLines={1}>{song.bookName}, sida {song.page}</Text>
      </Body>
      <Right>
        <Icon name='arrow-forward' />
      </Right>
    </ListItem>
  );

  render() {
    const {songs, loading, throttledRefresh, changeSearch, clearSearch, searchText} = this.props;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name='search' />
            <Input placeholder='Search' value={searchText} onChangeText={(text) => {
              changeSearch(text);
              throttledRefresh(text);
            }} />
          <Icon active name='md-close' onPress={() => {
            clearSearch();
            throttledRefresh('');
          }}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          {
            loading
            ? <Spinner color='#666'/>
            : <List dataArray={songs} renderRow={this.renderRow} />
          }
        </Content>
      </Container>
    );
  }
}

export default SongsView;
