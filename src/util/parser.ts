import { type IModelTemplate } from '../classes/Model';

export interface IParsedQuestion {
    question: string
    answer: string
}

const parseTemplateString = (fields: Record<string, string>, templateString: string): string => {
    return 'temp';
};

export function parseFieldsAndTemplate(fields: Record<string, string>, template: IModelTemplate): IParsedQuestion {
    const tempFields = { ...fields };

    const question = parseTemplateString(tempFields, template.qfmt);
    tempFields.FrontSide = question;

    const answer = parseTemplateString(tempFields, template.afmt);

    return {
        question,
        answer
    };
}
