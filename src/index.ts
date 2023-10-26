// Load the sql.js library
import initSqlJs from 'sql.js';
import fetch from 'node-fetch';
import { AnkiCollection } from './AnkiCollection';

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
