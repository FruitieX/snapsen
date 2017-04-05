import React, {Component} from 'react';

import {
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Button,
  Card,
  CardItem
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class AddSongBookView extends Component {
  static navigationOptions = {
    title: 'Lägg till sångbok'
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <InputGroup>
                  <Input placeholder='Url till sångbok'/>
                  <Button transparent
                    onPress={() => console.log('Nu söker de')}>
                    <Icon name='search'/>
                  </Button>
              </InputGroup>
            </CardItem>
          </Card>
        </Content>
    </Container>
    );
  }
}

export default AddSongBookView;
