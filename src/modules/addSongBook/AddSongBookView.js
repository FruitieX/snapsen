import React, {Component} from 'react';

import {
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Text,
  Spinner,
  Button,
  Body,
  Thumbnail,
  Left,
  Right,
  ListItem,
  Card,
  CardItem
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class AddSongBookView extends Component {
  static navigationOptions = {
    title: 'Lägg till sångbok'
  }

  state = {
    url: 'https://fruitiex.github.io/snapsen/books/template.json',
    fetchedUrl: ''
  };

  render() {
    const {download, add, book, loading} = this.props;

    let detailsCard = null;

    if (loading) {
      detailsCard = <Spinner />;
    } else if (this.state.fetchedUrl && book.songs) {
      detailsCard = (
        <Card>
          <CardItem header>
            <Text>Förhandsgranska sångbok</Text>
          </CardItem>
          <ListItem
            button
            avatar
            >
            <Left>
              <Thumbnail source={{uri: book.image}}/>
            </Left>
            <Body>
              <Text numberOfLines={1}>{book.title}</Text>
              <Text note numberOfLines={1}>{book.songs.length} sånger</Text>
            </Body>
          </ListItem>
          <CardItem>
            <Button success disabled={!this.state.url} onPress={() => add({
              url: this.state.fetchedUrl,
              data: book
            })}>
              <Icon name='add'/>
              <Text>Lägg till mina sångböcker</Text>
            </Button>
          </CardItem>
        </Card>
      );
    }

    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <InputGroup>
                <Input
                  value={this.state.url}
                  onChangeText={url => this.setState({url: url.trim()})}
                  placeholder='URL till sångbok'
                />
              </InputGroup>
            </CardItem>
            <CardItem>
              <Button info disabled={!this.state.url} onPress={() => {
                download(this.state.url);
                this.setState({fetchedUrl: this.state.url});
              }}>
                <Icon name='search'/>
                <Text>Sök</Text>
              </Button>
            </CardItem>
          </Card>

          { detailsCard }
        </Content>
    </Container>
    );
  }
}

export default AddSongBookView;
