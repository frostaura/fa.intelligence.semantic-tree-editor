import { ParameterTypes } from "@/enums/chat/ParameterTypes";

/**
 * A signature of a supported function parameters.
 */
export interface IParameter {
    name: string,
    description: string,
    type: ParameterTypes,
    required?: boolean
}