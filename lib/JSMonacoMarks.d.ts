import monaco, { MarkerSeverity, MarkerTag, Uri } from 'monaco-editor';
import { LintData, LintOptions } from 'jshint';
declare type Monaco = typeof monaco;
interface IRelatedInformation {
    resource: Uri;
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}
interface IMarkerData {
    code?: string | {
        value: string;
        target: Uri;
    };
    severity: MarkerSeverity;
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    relatedInformation?: IRelatedInformation[];
    tags?: MarkerTag[];
}
export declare class JSMonacoMarks {
    protected js: string;
    protected options?: LintOptions;
    protected linterResponse: LintData;
    constructor(js: string, options?: LintOptions);
    lint(): LintData;
    getEditorMarks(monaco: Monaco): IMarkerData[];
    getLinterResponse(): LintData;
}
export {};
