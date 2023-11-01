import { parseFieldsAndTemplate } from '../util/parser';
import { type Model, type IModelTemplate } from './Model';

export interface IFormattedString {
    rawValue: string
    formattedString: string
    latexFormattedString: string
}

export class Question {
    private readonly question: IFormattedString;
    private readonly answer: IFormattedString;
    private readonly template: IModelTemplate;
    private readonly model: Model;

    constructor(fields: Record<string, string>, template: IModelTemplate, model: Model) {
        const { question, answer } = parseFieldsAndTemplate(fields, template);
        this.question = this.buildFormattedString(question, question);
        this.answer = this.buildFormattedString(answer, answer);
        this.template = template;
        this.model = model;
    }

    private buildFormattedString(rawValue: string, formattedString: string): IFormattedString {
        return {
            rawValue,
            formattedString,
            latexFormattedString: this.getLatexPre() + formattedString + this.getLatexPost()
        };
    }

    public getLatexPre(): string {
        return this.model.getLatexPre();
    }

    public getLatexPost(): string {
        return this.model.getLatexPost();
    }

    public getCss(): string {
        return this.model.getCss();
    }

    public getRawTemplate(): IModelTemplate {
        return {
            ...this.template
        };
    }
}
