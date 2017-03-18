import React, {Component} from 'react';

import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  Spinner
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongDetailsView extends Component {
  static navigationOptions = {
    title: 'Info'
  }

  componentDidMount() {
    const {songId} = this.props;

    this.props.getSongDetails(songId);
  }

  render() {
    const {song, loading} = this.props;

    return (loading ? (
      <Container>
        <Content>
          <Spinner color='#666'/>
        </Content>
      </Container>
    ) : (
      <Container>
        <Content>
          <Card>
            <CardItem bordered>
              <Left>
                <Thumbnail tintColor='black' source={{uri: song.imageUrl}}/>
                <Body>
                  <Text>{song.title}</Text>
                  <Text note>Från {song.bookName}, sida: {song.page}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <Text>{song.lyrics}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    ));
  }
}

export default SongDetailsView;
