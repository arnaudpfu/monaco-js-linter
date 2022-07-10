import { LintOptions } from 'jshint';
import monaco, { editor } from 'monaco-editor';
declare type Monaco = typeof monaco;
export declare class JSMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected options?: LintOptions;
    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, options?: LintOptions);
    lint(): void;
    watch(): void;
}
export {};
