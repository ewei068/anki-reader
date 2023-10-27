import { type SqlValue } from 'sql.js';

export class Card {
    private readonly id: string;
    private readonly cardData: Record<string, SqlValue>;
    private readonly db: any;

    constructor(id: string, cardData: Record<string, SqlValue>) {
        this.id = id;
        this.cardData = cardData;
    }

    public getRawCard(): any {
        return this.cardData;
    }
}
