import React, {Component} from 'react';
import {} from 'react-native';
import {Container, Content, Text, Card, CardItem, Body} from 'native-base';

class SongDetailsView extends Component {
  componentDidMount() {
    this.props.getSongDetails(this.props.songId);
  }

  static navigationOptions = {
    title: 'Info'
  }

  render() {
    const song = this.props.songDetails.data
    return (
      <Container>
        <Content>
          <Card>
            <CardItem bordered>
              <Body>
                <Text>{song.title}</Text>
                <Text note>Från TF:s sångbok, sida: {song.page}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text>{song.lyrics}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default SongDetailsView;
