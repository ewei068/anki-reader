interface IModelField {
    name: string
    ord: number
    font: string
    size: number
    sticky: boolean
}

interface IModelTemplate {
    afmt: string
    bafmt: string
    bqfmt: string
    did?: number
    name: string
    ord: number
    qfmt: string
}

export class Model {
    private readonly id: string;
    private readonly modelJson: any;
    private css?: string;
    private flds?: IModelField[];
    private latexPre?: string;
    private latexPost?: string;
    private name?: string;
    private type?: number;
    private tmpls?: IModelTemplate[];

    constructor(id: string, modelJson: any) {
        this.id = id;
        this.modelJson = modelJson;
    }

    public getId(): string {
        return this.id;
    }

    public getCss(): string {
        if (this.css != null) {
            return this.css;
        }

        this.css = this.modelJson.css ?? '';
        return this.css ?? '';
    }

    public getFields(): IModelField[] {
        if (this.flds != null) {
            return [
                ...this.flds
            ];
        }

        this.flds = this.modelJson.flds ?? [];
        return [
            ...this.flds ?? []
        ];
    }

    public getLatexPre(): string {
        if (this.latexPre != null) {
            return this.latexPre;
        }

        this.latexPre = this.modelJson.latexPre ?? '';
        return this.latexPre ?? '';
    }

    public getLatexPost(): string {
        if (this.latexPost != null) {
            return this.latexPost;
        }

        this.latexPost = this.modelJson.latexPost ?? '';
        return this.latexPost ?? '';
    }

    public getName(): string {
        if (this.name != null) {
            return this.name;
        }

        this.name = this.modelJson.name ?? '';
        return this.name ?? '';
    }

    public getType(): number {
        if (this.type != null) {
            return this.type;
        }

        this.type = this.modelJson.type ?? 0;
        return this.type ?? 0;
    }

    public getTemplates(): IModelTemplate[] {
        if (this.tmpls != null) {
            return [
                ...this.tmpls
            ];
        }

        this.tmpls = this.modelJson.tmpls ?? [];
        return [
            ...this.tmpls ?? []
        ];
    }

    public getRawModel(): any {
        return {
            ...this.modelJson
        };
    }
}
