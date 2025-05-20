import { Views } from "./enums/Views"
import { IState } from "./interfaces/state/IState"

/**
 * The initial state configuration for the global state.
 * 
 * This should ideally be inferred from appsettings.json.
 */
export const InitialState: IState = {
    activeView: Views.Landing,
    activeUser: {
        email: "deanmar@outlook.com",
        firstName: "Dean",
        lastName: "Martin"
    },
    projects: [],
    semanticEditor: {
        options: {
            tabSize: 4,
            insertSpaces: false,
            detectIndentation: true,
            trimAutoWhitespace: true,
            largeFileOptimizations: true,
            "semanticHighlighting.enabled": true,
            formatOnType: true,
            formatOnPaste: true,
            wordWrap: "on",
            autoClosingBrackets: "always",
            autoIndent: "full",
            codeLens: true,
            lineNumbers: "on",
            padding: {
                top: 15,
                bottom: 15
            }
        },
        suggestionsCount: 5
    }
}