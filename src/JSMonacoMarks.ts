import monaco, { MarkerSeverity, MarkerTag, Uri } from 'monaco-editor';
import { JSHINT } from 'jshint/dist/jshint';
import { LintData, LintOptions } from 'jshint';

type Monaco = typeof monaco;

type MarkerSeveritySlug = 'Info' | 'Warning' | 'Error';

interface IRelatedInformation {
    resource: Uri;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}

interface IMarkerData {
    code?:
        | string
        | {
              value: string;
              target: Uri;
          };
    severity: MarkerSeverity; // Hint | Info | Warning | Error
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    relatedInformation?: IRelatedInformation[];
    tags?: MarkerTag[];
}

export class JSMonacoMarks {
    protected js: string;
    protected ruleset?: LintOptions;
    protected linterResponse: LintData;

    constructor(js: string, ruleset?: LintOptions) {
        this.js = js;
        this.ruleset = ruleset;
        this.linterResponse = this.lint();
    }

    public lint(): LintData {
        JSHINT(this.js);
        const data = JSHINT.data();
        if (!data) {
            throw new Error('Data is not defined.');
        }
        return data;
    }

    public getEditorMarks(monaco: Monaco): IMarkerData[] {
        let marks: IMarkerData[] = [];
        const errors = this.linterResponse.errors;
        if (errors) {
            marks = errors.map((issue) => {
                if (issue.id && issue.id !== '(error)') {
                    throw new Error('issue.id is different of (error).');
                }

                return {
                    startLineNumber: issue.line,
                    startColumn: issue.character,
                    endLineNumber: issue.line,
                    endColumn: issue.character - issue.evidence?.length || 0,
                    message: issue.reason,
                    severity: monaco.MarkerSeverity['Error' as MarkerSeveritySlug],
                };
            });
        }

        return marks;
    }

    public getLinterResponse(): LintData {
        return this.linterResponse;
    }
}
