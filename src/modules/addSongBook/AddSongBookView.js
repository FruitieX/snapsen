import React, {Component} from 'react';

import {
  Container,
  Content,
  Card,
  Body,
  CardItem,
  Input,
  Item,
  Label
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
            <CardItem bordered>
              <Body>
                <Item floatingLabel>
                  <Label>URL till sångbok</Label>
                  <Input />
                </Item>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default AddSongBookView;
