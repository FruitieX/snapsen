import React, {Component} from 'react';

import {
  Container,
  Content,
  Text,
  Card,
  CardItem
} from 'native-base';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongBookDetailsView extends Component {
  static navigationOptions = {
    title: 'Info'
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Text>
                Temp
              </Text>
            </CardItem>
          </Card>
        </Content>
    </Container>
    );
  }
}

export default SongBookDetailsView;
