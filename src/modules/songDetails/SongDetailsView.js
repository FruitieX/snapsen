import React, {Component} from 'react';
import {} from 'react-native';
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

class SongDetailsView extends Component {
  static navigationOptions = {
    title: 'Info'
  }

  componentDidMount() {
    this.props.getSongDetails(this.props.songId);
  }

  render() {
    const song = this.props.songDetails.data;
    console.log(song);
    return (this.props.songDetails.loading ? (
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
