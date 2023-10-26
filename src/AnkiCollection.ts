import { type Database } from 'sql.js';

export class AnkiCollection {
    private readonly db: Database;
    private decks?: any[];

    constructor(db: Database) {
        this.db = db;
    }

    public getDecks(): any[] {
        if (this.decks != null) {
            return this.decks;
        }

        const result = this.db.exec('SELECT decks FROM col');
        if (result == null || result.length === 0) {
            this.decks = [];
            return this.decks;
        }

        const decks = JSON.parse(result[0].values[0][0]?.toString() ?? '[]');
        this.decks = decks;
        return decks;
    }
}
