import { IFunction } from "@/interfaces/models/chat/IFunction";
import { ContentTypes } from "../../enums/chat/ContentTypes";
import { ModelTypes } from "../../enums/chat/ModelTypes";
import { Roles } from "../../enums/chat/Roles";
import { IMessage } from "../../interfaces/models/chat/IMessage";
import { IProgressUpdate } from "../../interfaces/models/chat/IProgressUpdate";
import { ITextContent } from "../../interfaces/models/chat/ITextContent";
import { IState } from "../../interfaces/state/IState";
import { Dict } from "styled-components/dist/types";
import { IParameter } from "@/interfaces/models/chat/IParameter";

/**
 * Chat with the large language model.
 * @param type The type of model to chat with.
 * @param conversation The conversation to chat with. This includes the actual string query which should be positioned last in the conversations collection.
 * @param onProgress A callback function to report progress. This includes things like tools executed by the LLM, RAG operations, etc. This handler executes async and should be non-blocking.
 * @param state The global state of the application which includes the configuration required.
 * @returns The updated conversation collection that contains the latest LLM response in the last/latest item inside the collection.
 */
export async function ChatAsync(type: ModelTypes, conversation: Array<IMessage>, onProgress: (update: IProgressUpdate) => void, state: IState, functions: Array<IFunction> = []): Promise<Array<IMessage>> {
    if(!state.llmConfig) throw new Error("chatAsync requires a valid LLM configuration to operate. This error could occur due to a call to this function prior to configuration being initialized.");

    console.debug(`[LLMData][chatAsync] Chatting with "${ModelTypes[type]}" with ${conversation.length} messages and ${functions.length} function(s) enabled.`);

    const modelName = type === ModelTypes.Full ? state.llmConfig.fullModelName : state.llmConfig.miniModelName;
    const requestUrl = state.llmConfig.baseApiUrl.replace("{MODEL_NAME}", modelName);
    const availableFunctions = functions.map((func: IFunction) => {
        const properties: Dict = {};

        func.parameters.forEach((param: IParameter) => {
            properties[param.name] = {
                type: param.type,
                description: param.description
            };
        });

        return {
            name: func.name,
            description: func.description,
            parameters: {
                type: "object",
                properties: properties,
                required: JSON.parse(`[${func
                    .parameters
                    .filter(p => p.required)
                    .map(p => `"${p.name}"`)
                    .join(",")}]`)
            }
        };
    });
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: conversation,
            functions: availableFunctions.length > 0 ? availableFunctions : undefined
        })
    };
    const response = await fetch(requestUrl, request);

    if (!response.ok) {
        throw new Error(`Failed to communicate with "${requestUrl}" (${response.status}): ${await response.text()}`);
    }

    const parsedResponse = await response.json();
    const functionalConversationHistory = [...conversation];
    const functionResultPrefix = "Function Result:";
    let finishReason = parsedResponse.choices[0].finish_reason;

    if(finishReason === "function_call"){
        const funcToCallDetails: Dict = parsedResponse.choices[0].message.function_call;
        const funcToCallName: string = funcToCallDetails.name;
        const funcToCallArgs: Dict = JSON.parse(funcToCallDetails.arguments);
        const funcToCallBody = functions
            .find(f => f.name === funcToCallName)
            ?.call;

        console.debug(`[LLMData][chatAsync][function_call]: Name: ${funcToCallName}, Args: ${JSON.stringify(funcToCallArgs)}`);

        const funcResponse: string = await funcToCallBody?.(funcToCallArgs);

        functionalConversationHistory.push(parsedResponse.choices[0].message);
        functionalConversationHistory.push({
            role: Roles.Assistant,
            content: `${functionResultPrefix} ${JSON.stringify(funcResponse)}`
        });

        const followUpResponse = await ChatAsync(type, functionalConversationHistory, onProgress, state, functions);
        const latestMessage = followUpResponse[followUpResponse.length - 1];

        return [...conversation, latestMessage];
    }

    const latestResponse: IMessage = {
        role: Roles.Assistant,
        content: parsedResponse.choices.map((choice: any) => {
            return {
                type: ContentTypes.Text,
                text: choice.message.content
            }
        })
    }
    const filteredConversation = conversation
        .filter(c => !!c.content)
        .filter(c => c.content.indexOf(functionResultPrefix) === -1);
    const updatedConversationHistory = [...filteredConversation, latestResponse];

    return updatedConversationHistory;
}

/**
 * Ask the large language model a question and return the response (simplified).
 * @param type The type of model to chat with.
 * @param text The text question / query to ask the LLM.
 * @param state The global state of the application which includes the configuration required.
 * @param functions The functions available to the LLM.
 * @returns The text response from the LLM.
 */
export async function AskAsync(type: ModelTypes, text: string, state: IState, functions: Array<IFunction> = []): Promise<string> {
    console.debug(`[LLMData][askAsync] Asking "${text}" with ${functions.length} function(s) enabled.`);

    const response = await ChatAsync(type, [
        {
            role: Roles.User,
            content: [
                {
                    type: ContentTypes.Text,
                    text: text
                }
            ]
        }
    ], (update: IProgressUpdate) => {}, state, functions);

    return (<ITextContent>response[response.length - 1].content[0]).text;
}