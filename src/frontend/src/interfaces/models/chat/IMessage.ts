import { Roles } from "../../../enums/chat/Roles";
import { IImageContent } from "./IImageContent";
import { ITextContent } from "./ITextContent";

/**
 * A signature of a chat message, commonly used by LLMs.
 */
export interface IMessage {
    role: Roles,
    content: Array<ITextContent | IImageContent | string> | string,
    name?: string
}