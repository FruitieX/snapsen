import React, {PropTypes, Component} from 'react';

import {
  Container,
  Content,
  Icon,
  Button,
  Header,
  Item,
  Input,
  Body,
  Right,
  ListItem,
  List,
  Text,
  Spinner
} from 'native-base';

class SongsView extends Component {
  static displayName = 'SongsView';

  static navigationOptions = {
    title: 'Sånger',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='md-musical-note' style={{fontSize: 24, color: props.tintColor}} />
      )
    })
  }

  static propTypes = {
    refresh: PropTypes.func.isRequired,
    throttledRefresh: PropTypes.func.isRequired,
    songs: PropTypes.shape({
      data: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired
    })
  };

  componentDidMount() {
    const {refresh} = this.props;
    refresh();
  }

  renderRow = song => (
    <ListItem button onPress={() => this.props.navigation.navigate('SongDetails', {songId: song.id})} key={song.id}>
      <Body>
        <Text>{song.title}</Text>
        <Text note>TF:s Sångbok, Sida {Math.round(Math.random() * 200)}</Text>
      </Body>
      <Right>
        <Icon name='arrow-forward' />
      </Right>
    </ListItem>
  );

  render() {
    const {songs, throttledRefresh} = this.props;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name='search' />
            <Input placeholder='Search' onChangeText={throttledRefresh} />
            <Icon active name='md-musical-note' />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          {
            songs.loading
            ? <Spinner />
            : <List dataArray={songs.data} renderRow={this.renderRow} />
          }
        </Content>
      </Container>
    );
  }
}

export default SongsView;
