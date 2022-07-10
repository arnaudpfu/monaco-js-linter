"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSMonacoLinter = void 0;
const JSMonacoMarks_1 = require("./JSMonacoMarks");
class JSMonacoLinter {
    constructor(editor, monaco, options) {
        this.editor = editor;
        this.monaco = monaco;
        this.options = options;
    }
    lint() {
        var _a;
        const code = this.editor.getValue();
        const languageID = (_a = this.editor.getModel()) === null || _a === void 0 ? void 0 : _a.getLanguageId();
        if (languageID === 'javascript') {
            const monacoLinter = new JSMonacoMarks_1.JSMonacoMarks(code, this.options);
            const issues = monacoLinter.getEditorMarks(this.monaco);
            const model = this.editor.getModel();
            if (model === null) {
                throw new Error("Your model still does't exist.");
            }
            this.monaco.editor.setModelMarkers(model, 'owner', issues);
        }
    }
    watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
exports.JSMonacoLinter = JSMonacoLinter;
