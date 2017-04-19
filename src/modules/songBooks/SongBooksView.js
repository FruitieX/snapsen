import React, {Component} from 'react';
import values from 'lodash/values';

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
  Fab
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongBooksView extends Component {
  static displayName = 'SongBooksView';

  static navigationOptions = {
    title: 'Sångböcker'
  }

  renderRow = book => (
    <ListItem
      button
      avatar
      key={book.title}
      onPress={() => this.props.navigation.navigate('SongBookDetails', {
        primaryColor: book.primaryColor,
        book
      })}
    >
      <Left>
        <Thumbnail source={{uri: book.image}}/>
      </Left>
      <Body>
        <Text numberOfLines={1}>{book.title}</Text>
        <Text note numberOfLines={1}>{book.songs.length} sånger</Text>
      </Body>
      <Right>
        <Icon name='arrow-forward' />
      </Right>
    </ListItem>
  );

  render() {
    const {books} = this.props;

    return (
      <Container>
        <Content>
          <List dataArray={Object.keys(books).map(
            url => ({...books[url], url})
          )} renderRow={this.renderRow} />
        </Content>
        <Fab
            direction='right'
            containerStyle={{marginLeft: 10}}
            style={{backgroundColor: '#5067FF'}}
            onPress={() => this.props.navigation.navigate('AddSongBook')}
            position='bottomRight'
            >
            <Icon name='md-add' />
        </Fab>
      </Container>
    );
  }
}

export default SongBooksView;
