"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSMonacoMarks = void 0;
const jshint_1 = require("jshint/dist/jshint");
class JSMonacoMarks {
    constructor(js, options) {
        this.js = js;
        this.options = options;
        this.linterResponse = this.lint();
    }
    lint() {
        (0, jshint_1.JSHINT)(this.js, this.options);
        const data = jshint_1.JSHINT.data();
        if (!data) {
            throw new Error('Data is not defined.');
        }
        return data;
    }
    getEditorMarks(monaco) {
        let marks = [];
        const errors = this.linterResponse.errors;
        if (errors) {
            marks = errors.map((issue) => {
                var _a;
                if (issue.id && issue.id !== '(error)') {
                    throw new Error('issue.id is different of (error).');
                }
                return {
                    startLineNumber: issue.line,
                    startColumn: issue.character,
                    endLineNumber: issue.line,
                    endColumn: issue.character - ((_a = issue.evidence) === null || _a === void 0 ? void 0 : _a.length) || 0,
                    message: issue.reason,
                    severity: monaco.MarkerSeverity['Error'],
                };
            });
        }
        return marks;
    }
    getLinterResponse() {
        return this.linterResponse;
    }
}
exports.JSMonacoMarks = JSMonacoMarks;
