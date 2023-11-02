import { readFromUrl } from '../src/index';

readFromUrl('http://127.0.0.1:8081/Amino_Acid_Flashcards/collection.anki2')
    .then(collection => {
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
    });