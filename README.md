# anki-reader

[![npm version](https://img.shields.io/npm/v/anki-reader.svg?style=flat-square)](https://www.npmjs.org/package/anki-reader)
[![npm downloads](https://img.shields.io/npm/dm/anki-reader.svg?style=flat-square)](https://npm-stat.com/charts.html?package=anki-reader)

A `.apkg` and `.anki2` file reader module. Compatable node, bun, and browser runtimes.

## Usage

### Installation

Using npm:
```
$ npm install anki-reader
```

Using bun:
```
$ bun install anki-reader
```

### Usage

After installation, pass in `.apkg` or `.anki2` files to their reader functions. This returns a collection object, which can be used to retrieve deck and card information. Additionally, if a `.apkg` file is returned, media files are also extracted.
```js
import { readAnkiPackage } from 'anki-reader';

const ankiFile = ...
readAnkiPackage(ankiFile)
  .then((extractedPackage) => {
    const { collection, media } = extractedPackage;

    const decks = collection.getDecks();
    for (const [deckId, deck] of Object.entries(decks)) {
      console.log(deckId, deck.getRawDeck());
      for (const [cardId, card] of Object.entries(deck.getCards())) {
        console.log(cardId, card.getRawCard());
      }
    }

    for (const [name, blob] of Object.entries(media)) {
      console.log(name, blob);
    }
  })
```

Alternatively, you can read a collection file directly from a URL with `readFromUrl` like so:
```js
import { readFromUrl } from 'anki-reader';

readFromUrl('http://127.0.0.1:8081/collection.anki2')
  .then((collection) => {
    const decks = collection.getDecks();
    for (const [deckId, deck] of Object.entries(decks)) {
      console.log(deckId, deck.getRawDeck());
      for (const [cardId, card] of Object.entries(deck.getCards())) {
        console.log(cardId, card.getRawCard());
      }
    }
  })
```

For more in-depth examples, see the [story directory](https://github.com/ewei068/anki-reader/tree/main/story).

### Browser

If you intend to use anki-reader in a browser runtime, you must configure additional settings so `sql.js` can locate the `wasm` file. See the official [sql.js documentation](https://github.com/sql-js/sql.js#examples) and [this React example](https://github.com/sql-js/react-sqljs-demo/tree/master).

**React**
```js
// App.js
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

export default function App() {
  const ankiFile = ...
  readAnkiCollection(ankiFile, {
    sqlConfig: { 
      locateFile: () => sqlWasm 
    },
  }

  ...

}
```

```js
// webpack.config.js
module.exports = {
    webpack: {
        configure: {
            // See https://github.com/webpack/webpack/issues/6725
            module:{
                rules: [{
                    test: /\.wasm$/,
                    type: 'javascript/auto',
                }]
                ...
            }
        }
    }
};
```

### API

Anki collections are stored as sqlite databases, which is what anki-reader queries. The anki-reader follows similarly to the data structure of the `.anki2` database structure, which can be [referenced here](https://github.com/ankidroid/Anki-Android/wiki/Database-Structure).

This package also provides methods to get the raw database objects or models. For example, `AnkiCollection.getRawCollection()` may be used to get the raw collection database, and can then use the `sql.js` API to query.

## Development (WIP)

To install dependencies:

```bash
bun install
```

To run:

Refer to `story/README.md`

To build typescript:

```bash
npm run build
```

This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
