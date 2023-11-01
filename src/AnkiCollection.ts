import { type Database } from 'sql.js';
import { Deck } from './Deck';
import { Model } from './Model';

export class AnkiCollection {
    private readonly db: Database;
    private crt?: Date;
    private mod?: Date;
    private scm?: Date;
    private decks?: Record<string, Deck>;
    private version?: number;
    private config?: any;
    private models?: Record<string, Model>;
    private dconf?: any;
    private tags?: any;

    constructor(db: Database) {
        this.db = db;
    }

    public getDecks(): Record<string, Deck> {
        if (this.decks != null) {
            return {
                ...this.decks
            };
        }

        const result = this.db.exec('SELECT decks FROM col');
        if (result == null || result.length === 0) {
            this.decks = {};
            return {};
        }

        const deckJsons: Record<string, any> = JSON.parse(result[0].values[0][0]?.toString() ?? '{}');
        const decks: Record<string, any> = {};
        for (const [deckId, deckJson] of Object.entries(deckJsons)) {
            decks[deckId] = new Deck(deckId, deckJson, this.db);
        }
        this.decks = decks;
        return {
            ...this.decks
        };
    }

    public getCreationTime(): Date {
        if (this.crt != null) {
            return this.crt;
        }

        const result = this.db.exec('SELECT crt FROM col');
        if (result == null || result.length === 0) {
            this.crt = new Date();
            return this.crt;
        }

        const crt = result[0].values[0][0];
        // multiply by 1000 to convert seconds to milliseconds (only for crt)
        this.crt = typeof crt === 'number' ? new Date(crt * 1000) : new Date();
        return this.crt;
    }

    public getModificationTime(): Date {
        if (this.mod != null) {
            return this.mod;
        }

        const result = this.db.exec('SELECT mod FROM col');
        if (result == null || result.length === 0) {
            this.mod = new Date();
            return this.mod;
        }

        const mod = result[0].values[0][0];
        this.mod = typeof mod === 'number' ? new Date(mod) : new Date();
        return this.mod;
    }

    public getSchemaModificationTime(): Date {
        if (this.scm != null) {
            return this.scm;
        }

        const result = this.db.exec('SELECT scm FROM col');
        if (result == null || result.length === 0) {
            this.scm = new Date();
            return this.scm;
        }

        const scm = result[0].values[0][0];
        this.scm = typeof scm === 'number' ? new Date(scm) : new Date();
        return this.scm;
    }

    public getVersion(): number {
        if (this.version != null) {
            return this.version;
        }

        const result = this.db.exec('SELECT ver FROM col');
        if (result == null || result.length === 0) {
            this.version = 0;
            return this.version;
        }

        const ver = result[0].values[0][0];
        this.version = typeof ver === 'number' ? ver : 0;
        return this.version;
    }

    public getConfig(): any {
        if (this.config != null) {
            return {
                ...this.config
            };
        }

        const result = this.db.exec('SELECT conf FROM col');
        if (result == null || result.length === 0) {
            this.config = {};
            return {};
        }

        const config = JSON.parse(result[0].values[0][0]?.toString() ?? '{}');
        this.config = config;
        return {
            ...this.config
        };
    }

    public getModels(): Record<string, Model> {
        if (this.models != null) {
            return {
                ...this.models
            };
        }

        const result = this.db.exec('SELECT models FROM col');
        if (result == null || result.length === 0) {
            this.models = {};
            return {};
        }

        const modelJsons = JSON.parse(result[0].values[0][0]?.toString() ?? '{}');
        const models: Record<string, Model> = {};
        for (const [modelId, modelJson] of Object.entries(modelJsons)) {
            models[modelId] = new Model(modelId, modelJson);
            this.models = models;
        }

        return {
            ...this.models
        };
    }

    public getDconf(): any {
        if (this.dconf != null) {
            return {
                ...this.dconf
            };
        }

        const result = this.db.exec('SELECT dconf FROM col');
        if (result == null || result.length === 0) {
            this.dconf = {};
            return {
                ...this.dconf
            };
        }

        const dconf = JSON.parse(result[0].values[0][0]?.toString() ?? '{}');
        this.dconf = dconf;
        return {
            ...this.dconf
        };
    }

    public getTags(): any {
        if (this.tags != null) {
            return {
                ...this.tags
            };
        }

        const result = this.db.exec('SELECT tags FROM col');
        if (result == null || result.length === 0) {
            this.tags = {};
            return {
                ...this.tags
            };
        }

        const tags = JSON.parse(result[0].values[0][0]?.toString() ?? '{}');
        this.tags = tags;
        return {
            ...this.tags
        };
    }

    public getRawCollection(): Database {
        return this.db;
    }
}
