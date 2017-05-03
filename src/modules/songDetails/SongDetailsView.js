import React, {Component} from 'react';

import color from 'color';
import {StatusBar} from  'react-native';

import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Badge,
  Left,
  Thumbnail,
  Button,
  Icon,
  Spinner
} from 'native-base';

import colors from '../../utils/colors';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongDetailsView extends Component {
  static navigationOptions = {
    title: 'Info',
    header: ({state}) => ({
      style: {
        backgroundColor: state.params.primaryColor // TODO
      },
      tintColor: '#fff'
    })
  }

  /*
  componentDidMount() {
    const {song} = this.props;

    this.props.getSongDetails(song.id);
  }
  */

  render() {
    const {song, book} = this.props;

    const badgeColor = colors[song.type] || colors['default'];
    const statusBarColor = color(book.primaryColor).darken(0.2).hexString();
    return (
      <Container>
        <StatusBar animated backgroundColor={statusBarColor} />
        <Content>
          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail source={{uri: book.image}}/>
                <Body>
                  <Text>{song.title}</Text>
                  <Text note>Från {book.title}, sida: {song.page}</Text>
                  <Badge style={{backgroundColor: badgeColor}}>
                    <Text>{song.type}</Text>
                  </Badge>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <Text note>{song.pre}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text>{song.lyrics}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text note>{song.post}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default SongDetailsView;
