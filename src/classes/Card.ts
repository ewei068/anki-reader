import { type SqlValue } from 'sql.js';
import { type AnkiCollection } from './AnkiCollection';
import { type Model } from './Model';
import { Question } from './Question';

export class Card {
    private readonly id: string;
    private readonly cardData: Record<string, SqlValue>;
    private readonly collection: AnkiCollection;
    private deckId?: string;
    private noteId?: string;
    private rawFields?: string;
    private orderedFields?: string[];
    private fields?: Record<string, string>;
    private modelId?: string;
    private model?: Model;
    private questions?: Question[];

    constructor(id: string, cardData: Record<string, SqlValue>, collection: AnkiCollection) {
        this.id = id;
        this.cardData = cardData;
        this.collection = collection;
    }

    public getId(): string {
        return this.id;
    }

    public getDeckId(): string {
        if (this.deckId != null) {
            return this.deckId;
        }

        const result = this.cardData.did?.toString() ?? '';
        this.deckId = result;
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

    public getOrderedFields(): string[] {
        if (this.orderedFields != null) {
            return [
                ...this.orderedFields
            ];
        }

        const result = this.getRawFields().split('\x1f');
        this.orderedFields = result;
        return [
            ...this.orderedFields
        ];
    }

    public getFields(): Record<string, string> {
        if (this.fields != null) {
            return {
                ...this.fields
            };
        }

        const model = this.getModel();
        const orderedFields = this.getOrderedFields();

        const result: Record<string, string> = {};
        for (let i = 0; i < orderedFields.length; i++) {
            if (i >= model.getFields().length) {
                break;
            }
            result[model.getFields()[i].name] = orderedFields[i];
        }

        this.fields = result;
        return {
            ...this.fields
        };
    }

    public getFront(): string {
        return this.getOrderedFields()[0];
    }

    public getBack(): string {
        return this.getOrderedFields()[1];
    }

    public getModelId(): string {
        if (this.modelId != null) {
            return this.modelId;
        }

        const result = this.cardData.mid?.toString() ?? '';
        this.modelId = result;
        return this.modelId;
    }

    public getModel(): Model {
        if (this.model != null) {
            return this.model;
        }

        const result = this.collection.getModels()[this.getModelId()];
        this.model = result;
        return this.model;
    }

    public getQuestions(): Question[] {
        if (this.questions != null) {
            return [
                ...this.questions
            ];
        }

        const questions: Question[] = [];
        const model = this.getModel();
        const fields = this.getFields();
        for (const template of model.getTemplates()) {
            const question = new Question(fields, template, model);
            if (question.getQuestionString() === '') {
                continue;
            }
            questions.push(question);
        }

        this.questions = questions;
        return [
            ...this.questions
        ];
    }

    public getRawCard(): any {
        return this.cardData;
    }
}
