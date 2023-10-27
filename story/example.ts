import { readFromUrl } from '../src/index';

readFromUrl('http://127.0.0.1:8081/collection.anki2')
    .then(collection => {
        // console.log('Decks:', collection.getDecks());
        console.log('Creation time:', collection.getCreationTime());
        console.log('Modification time:', collection.getModificationTime());
        console.log('Schema modification time:', collection.getSchemaModificationTime());
        console.log('version:', collection.getVersion());
        console.log('decks:', collection.getDecks());
        console.log('dconf:', collection.getDconf());
        console.log('models:', collection.getModels());
        console.log('tags:', collection.getTags());
        console.log('config:', collection.getConfig());
    });