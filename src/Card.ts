import { type SqlValue } from 'sql.js';

export class Card {
    private readonly id: string;
    private readonly deckId: string;
    private readonly cardData: Record<string, SqlValue>;
    private noteId?: string;
    private rawFields?: string;
    private fields?: string[];
    private modelId?: string;

    constructor(id: string, cardData: Record<string, SqlValue>, deckId: string) {
        this.id = id;
        this.cardData = cardData;
        this.deckId = deckId;
    }

    public getId(): string {
        return this.id;
    }

    public getDeckId(): string {
        return this.deckId;
    }

    public getNoteId(): string {
        if (this.noteId != null) {
            return this.noteId;
        }

        const result = this.cardData.nid?.toString() ?? '';
        this.noteId = result;
        return this.noteId;
    }

    public getRawFields(): string {
        if (this.rawFields != null) {
            return this.rawFields;
        }

        const result = this.cardData.flds?.toString() ?? '';
        this.rawFields = result;
        return this.rawFields;
    }

    public getFields(): string[] {
        if (this.fields != null) {
            return [
                ...this.fields
            ];
        }

        const result = this.getRawFields().split('\x1f');
        this.fields = result;
        return [
            ...this.fields
        ];
    }

    public getFront(): string {
        return this.getFields()[0];
    }

    public getBack(): string {
        return this.getFields()[1];
    }

    public getModelId(): string {
        if (this.modelId != null) {
            return this.modelId;
        }

        const result = this.cardData.mid?.toString() ?? '';
        this.modelId = result;
        return this.modelId;
    }

    public getRawCard(): any {
        return this.cardData;
    }
}
