import { LintOptions } from 'jshint';
import monaco, { editor } from 'monaco-editor';
declare type Monaco = typeof monaco;
export declare class JSMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected ruleset?: LintOptions;
    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, ruleset?: LintOptions);
    lint(): void;
    watch(): void;
}
export {};
