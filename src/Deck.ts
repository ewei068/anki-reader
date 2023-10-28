import { type SqlValue, type Database } from 'sql.js';
import { Card } from './Card';

export class Deck {
    private readonly id: string;
    private readonly deckJson: any;
    private readonly db: Database;
    private cards?: Record<string, Card>;
    private name?: string;
    private desc?: string;

    constructor(id: string, deckJson: any, db: Database) {
        this.id = id;
        this.deckJson = deckJson;
        this.db = db;
    }

    public getId(): string {
        return this.id;
    }

    public getCards(): Record<string, Card> {
        if (this.cards != null) {
            return {
                ...this.cards
            };
        }

        // join cards on notes to get the card data
        // TODO: cards and notes share some fields, so we need to alias them
        const result = this.db.exec(`
            SELECT cards.*, flds, sfld, mid FROM cards
            JOIN notes ON notes.id = cards.nid
            WHERE cards.did = ${this.id}
        `);
        if (result == null || result.length === 0) {
            this.cards = {};
            return {};
        }

        const cards: Record<string, Card> = {};
        for (const card of result[0].values) {
            // match columns to card data
            const cardData: Record<string, SqlValue> = {};
            for (let i = 0; i < result[0].columns.length; i++) {
                cardData[result[0].columns[i]] = card[i];
            }
            const id = cardData.id?.toString() ?? '';

            cards[id] = new Card(id, cardData, this.id);
        }
        this.cards = cards;
        return {
            ...this.cards
        };
    }

    public getName(): string {
        if (this.name != null) {
            return this.name;
        }

        this.name = this.deckJson.name ?? '';
        return this.deckJson.name ?? '';
    }

    public getDescription(): string {
        if (this.desc != null) {
            return this.desc;
        }

        this.desc = this.deckJson.desc ?? '';
        return this.deckJson.desc ?? '';
    }

    public getRawDeck(): any {
        return this.deckJson;
    }
}
