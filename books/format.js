const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require('fs');
const path = require('path');

const input = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tf.json'), { encoding: 'utf8' })
);

const melRegexp = /mel:\s(.*)/;
const musicalKeyRegexp = /(.*-(dur|moll),\s.*)/;

input.songs = input.songs.map(song => {
  song.id = song.title.replace(/\s/g, '-').toLowerCase()
  song.type = [song.type];

  song.pre = song.pre.split('\n');
  song.post = song.post.split('\n');

  // pre can contain: 'mel: MELODY', 'X-dur, Y', X-moll, Y'
  song.pre = song.pre.map(pre => {
    const melMatch = pre.match(melRegexp);
    const musicalKeyMatch = pre.match(musicalKeyRegexp);
    if (melMatch) {
      song.melody = melMatch[1];
      return '';
    }
    if (musicalKeyMatch) {
      song.musicalKey = musicalKeyMatch[1];
      return '';
    }

    return pre;
  });

  // filter empty entries out
  song.pre = song.pre.filter(pre => pre);

  if (song.pre.length === 0) {
    delete song.pre;
  } else {
    song.pre = song.pre.join('\n');
  }

  song.description = song.post.join('\n');
  delete song.post;

  return song;
});

fs.writeFileSync(path.join(__dirname, 'tf.modified.json'), JSON.stringify(input, 0, 2));
