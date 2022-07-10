# Monaco HTML Linter
Monaco HTML Linter is a simple HTML Linter plugin for the [Monaco Editor](https://microsoft.github.io/monaco-editor/). It uses [HTMLHint](https://htmlhint.com/) under the hood to verify HTML Code.

## Installation

```
npm i monaco-html-linter
```

## Usage

```ts
import monaco, { editor } from 'monaco-editor';
import HTMLMonacoLinter from 'monaco-html-linter';

// The Monaco Editor can be easily created, given an
// empty container and an options literal.
// Two members of the literal are "value" and "language".
// The editor takes the full size of its container.

const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'html code here ...',
  language: 'html'
});

const linter = new HTMLMonacoLinter(editor, monaco);
linter.watch();

```

You can get the linter response in this way :
```ts
import { HTMLMonacoMarks } from 'monaco-html-linter';

//...

const htmlCode = editor.getValue();
const report = new HTMLMonacoMarks(htmlCode);
const response = report.getLinterResponse();

```

## API

### Class: `HTMLMonacoLinter(editor: editor.IStandaloneCodeEditor, monaco: Monaco, ruleset?: Ruleset)`

#### Attributes

- `editor: editor.IStandaloneCodeEditor` The object returned when you create an editor.
- `monaco: typeof monaco` The monaco variable.
- `ruleset?: Ruleset` HTMLHint ruleset [options](https://htmlhint.com/docs/user-guide/list-rules).

#### Methods

- `lint` () => void: Lint one time the `editor`.
- `watch` () => void: Lint the `editor` each time the `onChange` event is triggered.

### Class: `HTMLMonacoMarks(html: string, ruleset: Ruleset = defaultRuleset)`

#### Attributes

- `html: string` The codoe to verify.
- `ruleset: Ruleset` HTMLHint ruleset options.
- `linterResponse: Hint[]` Value returned by HTMLHint.

#### Methods

- `getEditorMarks(monaco: Monaco): IMarkerData[]` Return the monaco markers.
- `getLinterResponse(): Hint[]`
- `lint(): Hint[]`

## License

MIT, see the [LICENSE](./LICENSE) file for detail.