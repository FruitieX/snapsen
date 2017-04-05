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
    const {songs, loading} = this.props;

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
