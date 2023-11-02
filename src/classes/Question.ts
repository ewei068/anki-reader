import { parseFieldsAndTemplate } from '../util/parser';
import { type Model, type IModelTemplate } from './Model';

export interface IFormattedString {
    rawValue: string
    formattedString: string
    latexFormattedString: string
}

export class Question {
    private readonly questionString: string;
    private readonly answerString: string;
    private readonly template: IModelTemplate;
    private readonly model: Model;
    private question?: IFormattedString;
    private answer?: IFormattedString;

    constructor(fields: Record<string, string>, template: IModelTemplate, model: Model) {
        const { question, answer } = parseFieldsAndTemplate(fields, template);
        this.questionString = question;
        this.answerString = answer;
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

    public getQuestion(): IFormattedString {
        if (this.question != null) {
            return {
                ...this.question
            };
        }

        this.question = this.buildFormattedString(this.template.qfmt, this.questionString);
        return {
            ...this.question
        };
    }

    public getAnswer(): IFormattedString {
        if (this.answer != null) {
            return {
                ...this.answer
            };
        }

        this.answer = this.buildFormattedString(this.template.afmt, this.answerString);
        return {
            ...this.answer
        };
    }

    public getQuestionString(): string {
        return this.questionString;
    }

    public getAnswerString(): string {
        return this.answerString;
    }

    public getRawTemplate(): IModelTemplate {
        return {
            ...this.template
        };
    }
}
