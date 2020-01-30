// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { nginxFormat } from 'nginx-format'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	vscode.languages.registerDocumentFormattingEditProvider('nginx', {
		provideDocumentFormattingEdits(document: vscode.TextDocument, options): Promise<vscode.TextEdit[]> {
			const newLineSeparator = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n'

			
			console.log(document.eol);
			const indent = options.insertSpaces ? ' '.repeat(options.tabSize) : '\t'
			const formatted = nginxFormat(document.getText(), {
				newLineSeparator,
				indent: indent,
			})
			const fileStart = new vscode.Position(0, 0);
			const fileEnd = document.lineAt(document.lineCount - 1).range.end;

			return Promise.resolve([
				vscode.TextEdit.replace(new vscode.Range(fileStart, fileEnd), formatted)
			])
		}
	})
}

// this method is called when your extension is deactivated
export function deactivate() { }
