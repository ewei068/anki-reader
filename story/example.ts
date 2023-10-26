import { readFromUrl } from '../src/index';

readFromUrl('http://127.0.0.1:8081/collection.anki2')
    .then(collection => {
        console.log('Decks:', collection.getDecks());
    });