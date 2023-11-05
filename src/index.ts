import initSqlJs from 'sql.js';
import fetch from 'node-fetch';
import { AnkiCollection } from './classes/AnkiCollection';
import * as zip from '@zip.js/zip.js';

interface IOptions {
    sqlConfig?: Partial<EmscriptenModule>
}

export async function readAnkiCollection(ankiCollection: Uint8Array, options?: IOptions): Promise<AnkiCollection> {
    const collection = await initSqlJs(options?.sqlConfig)
        .then(SQL => {
            const db = new SQL.Database(new Uint8Array(ankiCollection));

            return new AnkiCollection(db);
        })
        .catch(error => {
            console.error('Error loading SQLite database:', error);
            throw new Error('Error loading SQLite database');
        });
    return collection;
}

export async function readFromUrl(url: string, options?: IOptions): Promise<AnkiCollection> {
    const collection = await fetch(url)
        .then(async response => await response.arrayBuffer())
        .then(async arrayBuffer => { return await readAnkiCollection(new Uint8Array(arrayBuffer), options); })
        .catch(error => {
            console.error('Error loading SQLite database:', error);
            throw new Error('Error loading SQLite database');
        });

    return collection;
}

export async function readAnkiPackage(ankiPackage: Blob, options?: IOptions): Promise<AnkiCollection> {
    const reader = new zip.ZipReader(new zip.BlobReader(ankiPackage));
    return await reader.getEntries().then(async entries => {
        const collectionEntry = entries.find(entry => entry.filename === 'collection.anki2');
        if (collectionEntry?.getData == null) {
            throw new Error('Could not find collection.anki2 in Anki package');
        }

        const collectionArrayBuffer = await collectionEntry.getData(new zip.Uint8ArrayWriter());
        return await readAnkiCollection(new Uint8Array(collectionArrayBuffer), options);
    });
}

export async function readAnkiPackageFromUrl(url: string, options?: IOptions): Promise<AnkiCollection> {
    const reader = new zip.ZipReader(new zip.HttpReader(url));
    return await reader.getEntries().then(async entries => {
        const collectionEntry = entries.find(entry => entry.filename === 'collection.anki2');
        if (collectionEntry?.getData == null) {
            throw new Error('Could not find collection.anki2 in Anki package');
        }

        const collectionArrayBuffer = await collectionEntry.getData(new zip.Uint8ArrayWriter());
        return await readAnkiCollection(new Uint8Array(collectionArrayBuffer), options);
    });
}
