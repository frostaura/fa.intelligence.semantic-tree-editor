import { IContent } from "./IContent";

/**
 * A signature of a message's image content. The image content is assumed to be an image URL or base64 encoded image string.
 * 
 * NOTE: For base64 encoded images, the image URL should be a data URL. Example: f"data:image/png;base64,{base64_image}".
 */
export interface IImageContent extends IContent {
    image_url: {
        url: string
    }
}