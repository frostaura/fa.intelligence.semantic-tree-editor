/**
 * The schema of the LLM comms config.
 */
export interface ILLMConfig{
    baseApiUrl: string,
    fullModelName: string,
    miniModelName: string,
    imageModelName: string
}