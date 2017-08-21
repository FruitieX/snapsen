import React from 'react';

import color from 'color';
import {
  StatusBar,
  View,
  ScrollView,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-material-ui';

import {
  Lyrics,
  PreLyrics,
  PostLyrics,
  Padding,
  Title,
  NoteField,
} from '../../components/styled';
import SongItem from '../../components/SongItem';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  song: {
    ...ownProps.navigation.state.params.song,
  },
  books: state.books,
});
import colors from '../../utils/colors';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

class DetailField extends React.Component {
  render = () => {
    const { icon, title, value, ...rest } = this.props;

    if (!value) return null;

    return (
      <ListItem
        leftElement={<Avatar icon={icon} />}
        centerElement={{
          primaryText: String(title),
          secondaryText: String(value),
        }}
        numberOfLines={'dynamic'}
        {...rest}
      />
    );
  };
}

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
    const { song, books } = this.props;

    const badgeColor = colors[song.type] || colors['default'];

    //const statusBarColor = color(book.primaryColor).darken(0.2).hexString();
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding">
        <ScrollView>
          <Card>
            <SongItem song={song} books={books} onPress={() => null} />

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
              onPress={() =>
                this.openLink(
                  `https://www.youtube.com/results?search_query=${song.melody}`,
                )}
            />
            <DetailField
              icon="volume-up"
              title="Example"
              value={song.example}
              rightElement="arrow-forward"
              onPress={() => this.openLink(song.example)}
            />
            <DetailField
              icon="music-note"
              title="Key"
              value={song.musicalKey}
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
            <NoteField />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps)(SongDetails);
