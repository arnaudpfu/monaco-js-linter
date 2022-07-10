import { LintOptions } from 'jshint';
import monaco, { editor } from 'monaco-editor';
import { JSMonacoMarks } from './JSMonacoMarks';

type Monaco = typeof monaco;

export class JSMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected options?: LintOptions;

    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, options?: LintOptions) {
        this.editor = editor;
        this.monaco = monaco;
        this.options = options;
    }

    public lint() {
        const code = this.editor.getValue();
        const languageID = this.editor.getModel()?.getLanguageId();
        if (languageID === 'javascript') {
            const monacoLinter = new JSMonacoMarks(code, this.options);
            const issues = monacoLinter.getEditorMarks(this.monaco);
            const model = this.editor.getModel();
            if (model === null) {
                throw new Error("Your model still does't exist.");
            }
            this.monaco.editor.setModelMarkers(model, 'owner', issues);
        }
    }

    public watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
