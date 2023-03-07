import { VariableDataType } from "../services/types";

export const findCurrentVar = (variablesList: VariableDataType[], currentId: number) => {
  return variablesList.find(({ variableId }) => variableId === currentId);
}