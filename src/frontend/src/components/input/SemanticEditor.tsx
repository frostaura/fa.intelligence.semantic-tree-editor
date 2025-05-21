import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { DiffEditor, Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { ISemanticEditorConfig } from "../../interfaces/state/ISemanticEditorConfig";
import { Languages } from "../../enums/semantic/Languages";
import { ModelTypes } from "../../enums/chat/ModelTypes";
import { IState } from "../../interfaces/state/IState";
import { UserContext } from "../../App";
import { ChatInput } from "./ChatInput";
import { AskAsync } from "@/services/data/LLMData";
import { IFollowUpQuestion } from "@/interfaces/prompt_signatures/IFollowUpQuestion";
import { FaSpinner } from "react-icons/fa6";
import { projectIdeaRefining } from "@/prompts/edit.project_idea_refining";
import { SwitchInput } from "./SwitchInput";
import { ExpandableContainer } from "../containers/ExpandableContainer";
import { projectIdeaRefiningAnswer } from "@/prompts/edit.project_idea_refining_answer";
import { useEffectAsync } from "@/hooks/useAsyncEffect";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 20px;
    padding: var(--app-padding);
    background: rgba(20, 20, 24, 0.7);
    overflow: hidden;
    isolation: isolate;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-width: 1000px;

    & .main-editor .monaco-editor {
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
    }

    & label[data-scope="switch"] {
        display: inline-flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.8);
    }

    & .end-text {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        color: rgba(255, 255, 255, 0.6);
    }
`;

export const SideMenuContainer = styled.div`
    width: 250px;
    position: relative;
    border-radius: 16px;
    padding: 20px;
    background: rgba(30, 30, 35, 0.6);
    overflow: auto;
    isolation: isolate;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: var(--app-padding);

    /* Ensures all text inside is white */
    color: #FFFFFF;  

    & .title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 20px;
        background: linear-gradient(45deg, #ff69b4, #9370db);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    & * {
        color: #FFFFFF; /* Apply white text globally inside */
    }

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(147, 112, 219, 0.2);
        border-radius: 3px;
        
        &:hover {
            background: rgba(147, 112, 219, 0.3);
        }
    }
`;


const ChatInputContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 16px;
    padding: 16px;
    background: rgba(30, 30, 35, 0.6);
    isolation: isolate;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);

    & input {
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px;
        border-radius: 12px;
        background: rgba(40, 40, 45, 0.6);
        backdrop-filter: blur(8px);
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 16px;
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: rgba(147, 112, 219, 0.5);
            background: rgba(50, 50, 55, 0.95);
            box-shadow: 0 0 0 2px rgba(147, 112, 219, 0.1);
        }

        &::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
    }

    & button {
        position: relative;
        border: none;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        background: linear-gradient(135deg, #9370db, #ff69b4);
        color: white;
        transition: all 0.2s ease;
        overflow: hidden;
        isolation: isolate;

        &:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }
    }
`;


export function SemanticEditor(props: {
    context: string,
    value: string,
    onChange?: (newValue: string) => void,
    options: ISemanticEditorConfig,
    language: Languages,
    askLLMAsync(type: ModelTypes, text: string, state: IState): Promise<string>,
    height: string
}) {
    const [state, reducer] = useContext(UserContext);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco): void => {
        editorRef.current = editor;
        editorRef.current.focus();
    };
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [value, setValue] = useState<string>(props.value);
    const [showDiff, setShowDiff] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Array<IFollowUpQuestion>>([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const theme = "vs-dark";

    useEffect(() => {
        const selectionWatcher = () => {
            if (!editorRef.current) return;

            const selection = editorRef.current.getSelection();
            const model = editorRef.current.getModel();

            if (!selection || !model) return;

            const selectedText = model?.getValueInRange(selection);

            setSelectedText(selectedText);
        };
        const selectionWatcherInterval = setInterval(selectionWatcher, 100);

        selectionWatcher();
        return () => clearInterval(selectionWatcherInterval);
    }, []);

    useEffectAsync(async () => {
        if (suggestionsLoading) return;
        if (!state.llmConfig) return;

        setSuggestionsLoading(true);

        const prompt = props.context
            .replace("{CONTEXT}", value)
            .replace("{QUESTIONS_COUNT}", `${state.semanticEditor.suggestionsCount}`);
        const response = await AskAsync(ModelTypes.Mini, prompt, state);

        try {
            const parsedSuggestions = JSON.parse(response);
            setSuggestions(parsedSuggestions);
        } catch (error) {
            console.error("Failed to parse JSON response:", response);
            // Optionally, handle the error by setting suggestions to an empty array or a fallback value
            setSuggestions([]);
        }

        setSuggestionsLoading(false);
    }, [value, state.llmConfig]);

    return (
        <StyledContainer>
            <div className="end-text">
                <SwitchInput
                    onChange={(enabled: boolean) => setShowDiff(enabled)}
                    value={showDiff}
                    label="Compare Original"
                    reverseOrientation={true}
                />
            </div>

            <div className="margin-bottom flex">
                <SideMenuContainer style={{ height: props.height }}>
                    <div className="title">AI Suggestions</div>
                    <div className="suggestions">
                        {suggestionsLoading && (
                            <div className="flex flex-center">
                                <FaSpinner className="spin" />
                            </div>
                        )}
                        {!suggestionsLoading && suggestions.length <= 0 && <div>No suggestions.</div>}
                        {!suggestionsLoading &&
                            suggestions.map(suggestion => (
                                <ExpandableContainer key={suggestion.question} label={suggestion.question}>
                                    <div className="color-secondary">Why answer this?</div>
                                    <div className="margin-bottom">{suggestion.reasoning}</div>
                                    <ChatInput
                                        hideFileUpload={true}
                                        usePrimaryStyling={true}
                                        placeholder="Answer the question"
                                        onChange={async (text, files, resetInput) => {
                                            const prompt = projectIdeaRefiningAnswer
                                                .replace("{CONTEXT}", value)
                                                .replace("{SUGGESTED_QUESTION}", suggestion.question)
                                                .replace("{ANSWER}", text);
                                            const response = await AskAsync(ModelTypes.Mini, prompt, state);

                                            setValue(response);
                                            props.onChange?.(response);
                                            resetInput();
                                        }}
                                    />
                                </ExpandableContainer>
                            ))}
                    </div>
                </SideMenuContainer>

                <div className="flex-spacer">
                    {!showDiff && (
                        <Editor
                            className="main-editor"
                            theme={theme}
                            height={props.height}
                            value={value}
                            language={props.language}
                            onChange={(newValue) => {
                                setValue(newValue ?? "");
                                props.onChange?.(newValue ?? "");
                            }}
                            onMount={onMount}
                            options={props.options.options}
                        />
                    )}
                    {showDiff && (
                        <DiffEditor
                            className="diff-editor"
                            theme={theme}
                            height={props.height}
                            original={props.value}
                            modified={value}
                            options={props.options.options}
                        />
                    )}
                </div>
            </div>


            <ChatInput
                placeholder={
                    selectedText
                        ? `Suggest changes on selection (${selectedText?.split(" ").length} words)`
                        : "Suggest changes on the entire text"
                }
                onChange={async (text, files, resetInput) => {
                    const prompt = projectIdeaRefining
                        .replace("{CONTEXT}", value)
                        .replace("{REQUESTED_CHANGES}", text)
                        .replace("{SELECTED_TEXT}", selectedText ?? "");
                    const response = await AskAsync(ModelTypes.Mini, prompt, state);

                    setValue(response);
                    props.onChange?.(response);
                    resetInput();
                }}
            />

        </StyledContainer>
    );
}
