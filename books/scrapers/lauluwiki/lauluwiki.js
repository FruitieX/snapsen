const himalaya = require('himalaya');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require('fs');

// Path to lyrics element
const lyricsPath = [
  elem => elem.tagName === 'body',
  elem => elem.attributes && elem.attributes.id === 'contentframe',
  elem => elem.attributes && elem.attributes.id === 'lyrics',
]

// Path to various song properties which are under the lyrics element
const propertyPaths = {
  title: [
    ...lyricsPath,
    elem => elem.attributes && elem.attributes.id === 'songtitle',
  ],
  type: [
    ...lyricsPath,
    elem => elem.attributes && elem.attributes.id === 'categories',
  ],
  lyrics: [
    ...lyricsPath,
    elem => elem.tagName === 'pre'
  ],
  page: [
    ...lyricsPath,
    elem => elem.attributes && elem.attributes.id === 'songid',
  ],
};

// Lauluwiki places extra details in a separate element from lyrics, here's the
// map from Lauluwiki detail property -> Snapsen song property
const detailMappings = {
  Yleistietoa: 'description',
  Melodia: 'melody',
  Esimerkki: 'example',
  Vuosi: 'year',
  'Laulu on listattuna lähteissä:': 'source',
};

// Path to song details element
const detailsPath = [
  elem => elem.tagName === 'body',
  elem => elem.attributes && elem.attributes.id === 'contentframe',
  elem => elem.attributes && elem.attributes.className && elem.attributes.className.includes('infoboxcontainer')
];

const getSongProperties = (root) => {
  const songProperties = {};

  Object.keys(propertyPaths).forEach(property => {
    // Find element corresponding 'property' from AST
    const elem = propertyPaths[property].reduce(
        (prevElem, filterFun) => prevElem.children && prevElem.children.find(filterFun),
        root
    );

    if (!elem) {
      console.log(`No element found for property ${property}!`);
    } else if (!elem.children || !elem.children[0]) {
      console.log(`No child elements found for property ${property}! (elem: ${JSON.stringify(elem)})`);
    } else {
      // At this point we just take whatever is in the first child element's .content
      // and pass it through entities to decode any HTML entities
      songProperties[property] = entities.decode(String(elem.children[0].content).trim());
    }
  });

  // Some songs contain additional details, they must be parsed differently:
  // tagName: h3 => find next tagName: p and take its children[0].content
  const detailsElem = detailsPath.reduce(
      (prevElem, filterFun) => prevElem.children && prevElem.children.find(filterFun),
      root
  );

  detailsElem.children.forEach((child, index) => {
    // Did we found a title under details?
    if (child.tagName === 'h3') {
      let detailsTitle = entities.decode(String(child.children[0].content).trim());

      // If so, look at the tags following index until we find a tagName === 'p'
      let details = detailsElem.children.slice(index + 1).find(child => child.tagName === 'p')

      if (!details || !details.children) {
        console.log(`WARNING: Found h3 tag with contents: ${detailsTitle}, but no matching 'p' tag after it containing details!`);
        return;
      }

      const traverseChild = (elem) => {
        if (elem.children) {
          return elem.children.map(traverseChild).join(' ');
        } else {
          return elem.content.trim();
        }
      };

      // Flatten all child contents to one string
      details = traverseChild(details);

      // Map lauluwiki song detail fields to Snapsen
      detailsTitle = detailMappings[detailsTitle];

      songProperties[detailsTitle] = entities.decode(details);
    }
  });

  // Trim example
  if (songProperties.example)
    songProperties.example = songProperties.example.trim();

  // Generate ID from title
  songProperties.id = songProperties.title.replace(/\s/g, '-').toLowerCase();

  // Convert page to integer
  songProperties.page = parseInt(songProperties.page.slice(1));

  // CRLF => newline
  songProperties.lyrics = songProperties.lyrics.replace(/\r\n/g, '\n');
  if (songProperties.description)
    songProperties.description = songProperties.description.replace(/\r\n/g, '\n');

  // Replace type string with array
  songProperties.type =
    songProperties.type.split(',')    // comma separated
    .map(type => type.trim())         // trim each element
    .filter(type => type);            // filter out empty strings

  return songProperties;
};

/**
 * Loop over downloaded Lauluwiki HTML pages:
 *
 * You can fetch them all e.g. with this script:
 *
 * MAX_ID=413 # Id of last song in Lauluwiki
 *
 * for index in $(seq 0 $MAX_ID); do
 *   echo fetching http://lauluwiki.otaniemi.info/id/$index/...
 *   curl "http://lauluwiki.otaniemi.info/id/$index/" > "songs/$index.html"
 *   sleep 3
 * done
 */
const path = require('path');
const songsDir = path.join(__dirname, 'songs');

const filenames = fs.readdirSync(songsDir);

// Result stored here
const songs = [];

filenames.forEach(filename => {
  const html = fs.readFileSync(path.join(songsDir, filename), { encoding: 'utf8' });
  const json = himalaya.parse(html);
  const song = getSongProperties(json.find(elem => elem.tagName === 'html'));

  songs.push(song);
})

songs.sort((a, b) => a.page - b.page);

const outputFile = 'lauluwiki.json';
fs.writeFileSync(outputFile, JSON.stringify({
  title: 'Lauluwiki',
  id: 'lauluwiki',
  description: 'Imported songs from Otaniemi Lauluwiki at http://lauluwiki.otaniemi.info.',
  primaryColor: '#6d6d6d',
  versions: {
    book: 1,
    snapsen: 1,
  },
  author: {
    name: 'FruitieX',
    email: 'fruitiex@gmail.com',
  },
  image: "data:image/png;base64,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",
  songs
}, 0, 2));

console.log(`Wrote ${outputFile}.`);
