import { IContent } from "./IContent";

/**
 * A signature of a message's text content.
 */
export interface ITextContent extends IContent {
    text: string
}