import monaco, { editor } from 'monaco-editor';
import { JSHINT } from 'jshint/dist/jshint';
import { LintData, LintOptions } from 'jshint';

type Monaco = typeof monaco;

type MarkerSeveritySlug = 'Info' | 'Warning' | 'Error';

export class JSMonacoMarks {
    protected js: string;
    protected options?: LintOptions;
    protected linterResponse: LintData;

    constructor(js: string, options?: LintOptions) {
        this.js = js;
        this.options = options;
        this.linterResponse = this.lint();
    }

    public lint(): LintData {
        JSHINT(this.js, this.options);
        const data = JSHINT.data();
        if (!data) {
            throw new Error('Data is not defined.');
        }
        return data;
    }

    public getEditorMarks(monaco: Monaco): editor.IMarkerData[] {
        let marks: editor.IMarkerData[] = [];
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
