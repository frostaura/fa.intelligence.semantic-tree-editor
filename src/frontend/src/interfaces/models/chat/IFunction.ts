import { Dict } from "styled-components/dist/types";
import { IParameter } from "./IParameter";

/**
 * A signature of a supported function.
 */
export interface IFunction {
    name: string,
    description: string,
    parameters: Array<IParameter>,
    call: (args: Dict) => Promise<any>
}