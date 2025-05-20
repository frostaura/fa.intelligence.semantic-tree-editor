import styled from "styled-components";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { useRef, useState } from "react";
import { MagicAnimationContainer } from "../containers/MagicAnimationContainer";
import { MagicAnimationContainerModes } from "../../enums/components/containers/MagicAnimationContainerModes";

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

export function OnFileChanged(event: React.ChangeEvent<HTMLInputElement>, setInputText: React.Dispatch<React.SetStateAction<string>>, resetInput: () => void, setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>, onChange?: (text: string, resetInput: () => void) => void){
    const file = event.target.files?.[0];

    if(!file) return;

    setIsProcessing(true);
    ReadFileContent(file, setInputText, resetInput, onChange);
};

const ReadFileContent = (file: File, setInputText: React.Dispatch<React.SetStateAction<string>>, resetInput: () => void, onChange?: (text: string, resetInput: () => void) => void) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const content = event.target?.result as string;

        setInputText(content);
        onChange?.(content, resetInput);
    };
    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
    reader.readAsText(file);
};

export function ChatInput(props: {
    onChange?: (text: string, resetInput: () => void) => void;
    autoFocus?: boolean,
    placeholder?: string,
    hideFileUpload?: boolean,
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
                                        props.onChange?.(inputText, resetInput);
                                    }
                                }}
                                autoFocus={props.autoFocus ?? false}/>
                        </div>
                        {showFileUpload &&
                            <div className="rounded-button background-color-secondary pointer larger margin-left-half" title="Upload Text File">
                                {isProcessing && <FaSpinner className="spin" />}
                                {!isProcessing && <FaPlus onClick={() => {
                                    setIsFocused(true);
                                    handleFileUploadClick();
                                }} />}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        OnFileChanged(e, setInputText, resetInput, setIsProcessing, props.onChange);
                                        setIsFocused(false);
                                    }}
                                    className="hidden-file-input"
                                />
                            </div>
                        }
                    </div>
                </StyledContainer>
            </MagicAnimationContainer>
        </div>
    );
}