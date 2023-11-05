import 'web-streams-polyfill'; // Polyfill TransformStream globally
import 'isomorphic-fetch'; // Polyfill fetch globally
import { Blob } from 'blob-polyfill'; // Polyfill Blob globally
globalThis.Blob = Blob;

import { readAnkiPackageFromUrl, readAnkiPackage } from '../lib/src/index.js';

readAnkiPackageFromUrl('http://127.0.0.1:8081/Amino_Acid_Flashcards.apkg')
    .then(extractedPackage => {
        const { collection, media } = extractedPackage;
        console.log('Creation time:', collection.getCreationTime());
        console.log('Modification time:', collection.getModificationTime());
        console.log('Schema modification time:', collection.getSchemaModificationTime());
        console.log('version:', collection.getVersion());
        console.log('dconf:', collection.getDconf());
        console.log('models:', collection.getModels());
        console.log('tags:', collection.getTags());
        console.log('config:', collection.getConfig());

        for (const deck of Object.values(collection.getDecks())) {
            console.log('Deck:', deck.getRawDeck());
            console.log('Name:', deck.getName());
            console.log('Description:', deck.getDescription());

            for (const card of Object.values(deck.getCards()).slice(0, 10)) {
                console.log('Card:', card.getRawCard());
                console.log('Fields:', card.getFields());
                //console.log('Front:', card.getFront());
                //console.log('Back:', card.getBack());
                //console.log('Note ID:', card.getNoteId());
                console.log('Model ID:', card.getModelId());

                for (const question of card.getQuestions()) {
                    console.log('Question:', question.getQuestion().formattedString);
                    console.log('Answer:', question.getAnswer().formattedString);
                }
            }
        }

        for (const [modelId, model] of Object.entries(collection.getModels())) {
            console.log('Model:', modelId);
            console.log('Name:', model.getName());
            console.log('Fields:', model.getFields());
            console.log('Templates:', model.getTemplates());
            console.log('CSS:', model.getCss());
        }

        for (const [name, blob] of Object.entries(media)) {
            console.log(name, blob);
        }
    });

fetch('http://127.0.0.1:8081/Amino_Acid_Flashcards.apkg')
    .then(res => res.blob())
    .then(buffer => readAnkiPackage(buffer))
    .then(extractedPackage => {
        const { collection, media } = extractedPackage;
        console.log('Creation time:', collection.getCreationTime());
        for (const [name, blob] of Object.entries(media)) {
            console.log(name, blob);
        }
    });
