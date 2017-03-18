import React, {Component} from 'react';

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
                <Thumbnail source={{uri: song.imageUrl}}/>
                <Body>
                  <Text>{song.title}</Text>
                  <Text note>Från {song.bookName}, sida: {song.page}</Text>
                  <Badge primary>
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

            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="star" />
              <Text>1,926 stars</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    ));
  }
}

export default SongDetailsView;
