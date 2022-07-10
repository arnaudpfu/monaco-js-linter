# Monaco JS Linter

Monaco JS Linter is a simple JavaScript Linter plugin for the [Monaco Editor](https://microsoft.github.io/monaco-editor/). It uses [jsHint](https://jshint.com/) under the hood to verify JavaScript Code.

## Installation

```
npm i monaco-js-linter
```

## Usage

```ts
import monaco, { editor } from 'monaco-editor';
import JSMonacoLinter from 'monaco-js-linter';

// The Monaco Editor can be easily created, given an
// empty container and an options literal.
// Two members of the literal are "value" and "language".
// The editor takes the full size of its container.

const editor = monaco.editor.create(document.getElementById('container'), {
    value: 'js code here ...',
    language: 'javascript',
});

const linter = new JSMonacoLinter(editor, monaco);
linter.watch();
```

You can get the linter response in this way :

```ts
import { JSMonacoMarks } from 'monaco-js-linter';

//...

const jsCode = editor.getValue();
const report = new JSMonacoMarks(jsCode);
const response = report.getLinterResponse();
```

## API

### Class: `JSMonacoLinter(editor: editor.IStandaloneCodeEditor, monaco: Monaco, options?: LintOptions)`

#### Attributes

-   `editor: editor.IStandaloneCodeEditor` The object returned when you create an editor.
-   `monaco: typeof monaco` The monaco variable.
-   `options?: LintOptions` ESHINT [options](https://jshint.com/docs/options/).

#### Methods

-   `lint` () => void: Lint one time the `editor`.
-   `watch` () => void: Lint the `editor` each time the `onChange` event is triggered.

### Class: `JSMonacoMarks(js: string, options?: LintOptions)`

#### Attributes

-   `html: string` The codoe to verify.
-   `options: LintOptions` JSHINT options.
-   `linterResponse: LintData` Value returned by JSHINT.

#### Methods

-   `getEditorMarks(monaco: Monaco): IMarkerData[]` Return the monaco markers.
-   `getLinterResponse(): LintData`
-   `lint(): LintData`

## License

MIT, see the [LICENSE](./LICENSE) file for detail.
