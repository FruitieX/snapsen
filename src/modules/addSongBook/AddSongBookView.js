import React, {Component} from 'react';

import {
  Container,
  Content,
  Text
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
          <Text>Temp</Text>
        </Content>
      </Container>
    );
  }
}

export default AddSongBookView;
