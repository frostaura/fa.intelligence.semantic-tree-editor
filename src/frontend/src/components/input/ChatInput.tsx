import styled from "styled-components";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { useRef, useState } from "react";
import { MagicAnimationContainer } from "../containers/MagicAnimationContainer";
import { MagicAnimationContainerModes } from "../../enums/components/containers/MagicAnimationContainerModes";
import { IFile } from "@/interfaces/models/IFile";

const DIRECTORIES_TO_IGNORE = [
    "node_modules",
    "bin",
    "obj",
    ".vs"
];
const StyledContainer = styled.div`
    & .glow-container,
    & .rounded-input,
    & .file-upload-button
    {
        position: relative;
        z-index: 1;
    }

    & .rounded-input{
        width: 100%;
        height: 50px;
    }

    & .rounded-input > div,
    & .rounded-input > div > img{
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
    }

    & .rounded-input > input{
        background: none;
        border: none;
        color: var(--app-color);
    }

    & .rounded-input > input:focus{
        outline: none;
    }

    & .hidden-file-input {
        display: none;
    }
`;

export function OnFileChanged(event: React.ChangeEvent<HTMLInputElement>, setInputText: React.Dispatch<React.SetStateAction<string>>, resetInput: () => void, setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>, onChange?: (text: string, files: Array<IFile>, resetInput: () => void) => void){
    const file = event.target.files?.[0];

    if(!file) return;

    setIsProcessing(true);
    ReadFileContent(file, setInputText, resetInput, onChange);
};

const ReadFileContent = (file: File, setInputText: React.Dispatch<React.SetStateAction<string>>, resetInput: () => void, onChange?: (text: string, files: Array<IFile>, resetInput: () => void) => void) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const content = event.target?.result as string;

        setInputText(content);
        onChange?.(content, [], resetInput);
    };
    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
    reader.readAsText(file);
};

export function ChatInput(props: {
    onChange?: (text: string, files: Array<IFile>, resetInput: () => void) => void;
    autoFocus?: boolean,
    placeholder?: string,
    hideFileUpload?: boolean,
    allowDirectoryUploading?: boolean,
    usePrimaryStyling?: boolean
}){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputText, setInputText] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const resetInput = () => {
        setInputText("");
        setIsProcessing(false);
    };
    const showFileUpload = props.hideFileUpload !== true;
    const usePrimaryStyling = props.usePrimaryStyling === true;
    const [files, setFiles] = useState<Array<IFile>>([]);

    return (
        <div className="size-full-width">
            <MagicAnimationContainer mode={MagicAnimationContainerModes.OnValueTrue} value={isFocused}>
                <StyledContainer>
                    <div className="chat-input flex flex-center">
                        <div
                            className={"rounded-input padding-half border-radius flex flex-center background-color" + (usePrimaryStyling ? "" : "-secondary")}
                            title="Describe the product to generate in as little or much detail as preferred.">
                            <div className="flex flex-center margin-left-half margin-right-half larger">
                                {(showFileUpload || (!showFileUpload && !isProcessing)) && <img src="/icons/app.icon.png" />}
                                {!showFileUpload && isProcessing && <FaSpinner className="spin" />}
                            </div>
                            <input
                                id="chat-input-text-input"
                                type="text"
                                placeholder={props.placeholder}
                                className="flex-spacer"
                                value={inputText}
                                disabled={isProcessing}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        setIsProcessing(true);
                                        props.onChange?.(inputText, files, resetInput);
                                    }
                                }}
                                autoFocus={props.autoFocus ?? false}/>
                        </div>
                        {showFileUpload &&
                            <div className="rounded-button background-color-secondary pointer larger margin-left-half" title={props.allowDirectoryUploading ? "Select a Directory" : "Select a File"}>
                                {isProcessing && <FaSpinner className="spin" />}
                                {!isProcessing && <FaPlus onClick={() => {
                                    setIsFocused(true);
                                    handleFileUploadClick();
                                }} />}
                                { props.allowDirectoryUploading &&
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onClick={() => setIsProcessing(true)}
                                        onChange={(e) => {
                                            setIsProcessing(true);

                                            const parsedFiles = Array.from(e.target.files || []);
                                            const fileReadTasks = parsedFiles
                                                .filter((f: File) => !DIRECTORIES_TO_IGNORE.some(dir => f.webkitRelativePath.includes(dir)))
                                                .map((f: File) =>
                                                    new Promise<{ path: string, content: string }>((resolve, reject) => {
                                                        const reader = new FileReader();

                                                        reader.onload = () => {
                                                            resolve({
                                                                path: (f as any).webkitRelativePath || f.name,
                                                                content: reader.result as string,
                                                            });
                                                        };
                                                        reader.onerror = () => {
                                                            reject(reader.error);
                                                        };
                                                        reader.readAsText(f);
                                                    })
                                                );

                                            Promise.all(fileReadTasks)
                                                .then((filesContents: Array<IFile>) => {
                                                    setFiles(filesContents);

                                                    if(filesContents && filesContents.length > 0){
                                                        const projectNameFromPath = filesContents[0]
                                                            .path
                                                            .split("/")[0]

                                                        setIsProcessing(false);
                                                        props.onChange?.(projectNameFromPath, filesContents, resetInput);
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error("Error reading files", error);
                                                })
                                                .finally(() => setIsProcessing(false));
                                        }}
                                        className="hidden-file-input"
                                        multiple
                                        {...({ webkitdirectory: "true", directory: "true" } as any)}
                                    />
                                }
                                { !props.allowDirectoryUploading &&
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onClick={() => setIsProcessing(true)}
                                        onChange={(e) => {
                                            setIsProcessing(true);
                                            OnFileChanged(e, setInputText, resetInput, setIsProcessing, props.onChange);
                                            setIsFocused(false);
                                            setIsProcessing(false);
                                        }}
                                        className="hidden-file-input"
                                    />
                                }
                            </div>
                        }
                    </div>
                </StyledContainer>
            </MagicAnimationContainer>
        </div>
    );
}