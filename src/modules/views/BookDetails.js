import React from 'react';

import color from 'color';
import {
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Card } from 'react-native-material-ui';

import DetailField from '../../components/DetailField';

import {
  Lyrics,
  PreLyrics,
  PostLyrics,
  Padding,
  Title,
  NoteField,
} from '../../components/styled';
import BookItem from '../../components/BookItem';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const book = ownProps.navigation.state.params.book;

  return {
    book,
  };
};

const mapDispatchToProps = dispatch => ({});

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class SongDetails extends React.Component {
  static navigationOptions = {
    title: 'Info',
    /*
    header: ({ state }) => ({
      style: {
        backgroundColor: state.params.primaryColor, // TODO
      },
      tintColor: '#fff',
    }),
    */
  };

  render() {
    const { book } = this.props;

    //const statusBarColor = color(book.primaryColor).darken(0.2).hexString();
    return (
      <ScrollView>
        <Card>
          <BookItem book={book} />
        </Card>
        <Card>
          <Padding>
            <Title>Details:</Title>
          </Padding>
          <DetailField
            icon="description"
            title="Description"
            value={book.description}
          />
          <DetailField icon="person" title="Author" value={book.author.name} />
          <DetailField
            icon="mail"
            title="E-mail"
            value={book.author.email}
            rightElement="arrow-forward"
            url={`mailto:${book.author.email}`}
          />
          <DetailField
            icon="queue-music"
            title="Number of songs"
            value={book.songs.length}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);
