import { editor } from "monaco-editor";

/**
 * The schema of the semantic editor config.
 */
export interface ISemanticEditorConfig{
    options: editor.IStandaloneEditorConstructionOptions,
    suggestionsCount: number
}