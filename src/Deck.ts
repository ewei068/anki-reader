import { type Database } from 'sql.js';

export class Deck {
    private readonly id: string;
    private readonly deckJson: any;
    private readonly db: Database;

    constructor(id: string, deckJson: any, db: Database) {
        this.id = id;
        this.deckJson = deckJson;
        this.db = db;
    }

    public getRawDeck(): any {
        return this.deckJson;
    }
}
