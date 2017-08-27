import React from 'react';

import color from 'color';
import {
  StatusBar,
  View,
  ScrollView,
  Linking,
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
import SongItem from '../../components/SongItem';
import colors from '../../utils/colors';
import { setNote } from '../../state/notes';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const song = ownProps.navigation.state.params.song;
  const book = state.books[song.bookUrl];

  return {
    song,
    book,
    note: state.notes[song.key],
  };
};

const mapDispatchToProps = dispatch => ({
  setNote: note => dispatch(setNote(note)),
});

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

  openLink = link => Linking.openURL(link);

  render() {
    const { song, book } = this.props;

    const badgeColor = colors[song.type] || colors['default'];

    //const statusBarColor = color(book.primaryColor).darken(0.2).hexString();
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding">
        <ScrollView>
          <Card>
            <SongItem song={song} book={book} />

            <Padding>
              <PreLyrics>
                {song.pre}
              </PreLyrics>
              <Lyrics>
                {song.lyrics}
              </Lyrics>
              <PostLyrics>
                {song.post}
              </PostLyrics>
            </Padding>
          </Card>
          <Card>
            <Padding>
              <Title>Details:</Title>
            </Padding>
            <DetailField
              icon="queue-music"
              title="Melody"
              value={song.melody}
              rightElement="arrow-forward"
              url={`https://www.youtube.com/results?search_query=${song.melody}`}
            />
            <DetailField
              icon="volume-up"
              title="Example"
              value={song.example}
              rightElement="arrow-forward"
              url={song.example}
            />
            <DetailField
              icon="music-note"
              title="Key"
              value={song.musicalKey}
            />
            <DetailField
              icon="library-books"
              title="Songbook"
              value={book.title}
            />
            <DetailField icon="book" title="Page" value={song.page} />
            <DetailField
              icon="filter-list"
              title="Type"
              value={song.type.join(', ')}
            />
            <DetailField
              icon="description"
              title="Description"
              value={song.description}
            />
            <DetailField icon="date-range" title="Year" value={song.year} />
            <DetailField icon="mode-edit" title="Source" value={song.source} />
          </Card>
          <Card>
            <DetailField
              icon="speaker-notes"
              title="Notes"
              value="You can write personal notes for the song here:"
            />
            <NoteField
              onChangeText={text =>
                this.props.setNote({
                  song,
                  book,
                  text,
                })}
              value={this.props.note}
            />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);
