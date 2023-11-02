import { type IModelTemplate } from '../classes/Model';

export interface IParsedQuestion {
    question: string
    answer: string
}

const parseTemplateString = (fields: Record<string, string>, templateString: string): string => {
    // while still have characters in string, look for next occurence of {{...}}
    // if found, look at value
    //  if #...,
    // if value in fields is empty, skip to next occurence of /...
    // if value in field not empty, continue
    // else, replace with value in fields

    let result = '';
    while (templateString.length > 0) {
        const nextIndex = templateString.indexOf('{{');
        if (nextIndex === -1) {
            result += templateString.substring(nextIndex);
            break;
        }

        result += templateString.substring(0, nextIndex);
        templateString = templateString.substring(nextIndex);

        const endIndex = templateString.indexOf('}}');
        if (endIndex === -1) {
            result += templateString;
            break;
        }

        const value = templateString.substring(2, endIndex);
        templateString = templateString.substring(endIndex + 2);

        if (value.startsWith('#')) {
            const fieldName = value.substring(1);
            // find next occurence of {{/...}}
            const endString = '{{/' + fieldName + '}}';
            const nextIndex = templateString.indexOf(endString);
            if (fields[fieldName] == null || fields[fieldName].trim() === '') {
                if (nextIndex === -1) {
                    break;
                }

                const index = nextIndex + endString.length;
                templateString = templateString.substring(index);
            } else {
                if (nextIndex !== -1) {
                    result += parseTemplateString(fields, templateString.substring(0, nextIndex));
                    const index = nextIndex + endString.length;
                    templateString = templateString.substring(index);
                }
            }
        } else if (value.startsWith('/')) {
            // this shouldn't happen, remove and ignore
        } else {
            result += fields[value] ?? '';
        }
    }

    return result;
};

export function parseFieldsAndTemplate(fields: Record<string, string>, template: IModelTemplate): IParsedQuestion {
    const tempFields = { ...fields };

    const question = parseTemplateString(tempFields, template.qfmt);
    if (question.trim() === '') {
        return {
            question: '',
            answer: ''
        };
    }

    tempFields.FrontSide = question;

    const answer = parseTemplateString(tempFields, template.afmt);

    return {
        question,
        answer
    };
}
