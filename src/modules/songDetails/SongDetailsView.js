import React, {Component} from 'react';
import {} from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
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
    ));
  }
}

export default SongDetailsView;
