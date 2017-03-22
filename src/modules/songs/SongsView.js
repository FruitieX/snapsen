import React, {Component} from 'react';

import {
  Container,
  Content,
  Icon,
  Button,
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

import {AnimatedHeader} from '../../components/AnimatedHeader';

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
      onPress={() => this.props.navigation.navigate('SongDetails', {song})}
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
    const {songs, loading, throttledRefresh} = this.props;

    return (
      <Container>
        <AnimatedHeader searchBar rounded>
          <Item>
            <Icon name='search' />
            <Input placeholder='Search' onChangeText={throttledRefresh} />
            <Icon active name='md-musical-note' />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </AnimatedHeader>
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
