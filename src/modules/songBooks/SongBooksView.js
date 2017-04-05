import React, {Component} from 'react';

import {
  Container,
  Content,
  Icon,
  Body,
  Thumbnail,
  Left,
  Right,
  ListItem,
  List,
  Text,
  Spinner,
  Fab
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongBooksView extends Component {
  static displayName = 'SongBooksView';

  static navigationOptions = {
    title: 'Sångböcker'
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
        <Content>
          {
            loading
            ? <Spinner color='#666'/>
            : <List dataArray={songs} renderRow={this.renderRow} />
          }
        </Content>
        <Fab
            direction='right'
            containerStyle={{marginLeft: 10}}
            style={{backgroundColor: '#5067FF'}}
            position='bottomRight'
            >
            <Icon name='md-add' />
        </Fab>
      </Container>
    );
  }
}

export default SongBooksView;
