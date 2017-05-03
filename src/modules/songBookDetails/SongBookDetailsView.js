import React, {Component} from 'react';
import color from 'color';
import {StatusBar} from 'react-native';
import {get} from '../../utils/api';

import {
  Container,
  Content,
  Text,
  Col,
  Card,
  Left,
  Body,
  Thumbnail,
  Button,
  CardItem,
  Icon
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongBookDetailsView extends Component {
  static navigationOptions = {
    title: 'Info',
    header: ({state}) => ({
      style: {
        backgroundColor: state.params.primaryColor // TODO
      },
      tintColor: '#fff'
    })
  }

  updateSongBook = async () => {
    const book = await get(this.props.book.url);
    this.props.updateBook({data: book, url: this.props.book.url});
    console.log('Updated');
  }

  render() {
    const {book, deleteBook} = this.props;
    const statusBarColor = color(book.primaryColor).darken(0.2).hexString();
    return (
      <Container>
        <StatusBar animated backgroundColor={statusBarColor} />
        <Content>
          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail source={{uri: book.imageUrl}}/>
                <Body>
                  <Text>{book.title}</Text>
                  <Text note>Antal sånger: {book.songs.length}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
            <Col>
              <Button danger iconLeft block onPress={() => {
                deleteBook(book.url);
                this.props.navigation.goBack(); }}>
                <Icon name='md-trash' />
                <Text> Ta bort </Text>
              </Button>
            </Col>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default SongBookDetailsView;
