export interface VinDataType {
    Value: string | null;
    ValueId: string | null;
    Variable: string;
    VariableId: number;
}

export interface VariableDataType {
    variableDescription: string;
    variableName: string;
    variableId: number;
}

export type VinDecodingType = {
    message: string,
    results: VinDataType[],
}

export type SetStateArgType<T> = T | ((arg: T) => T);
