import { fetchRequest } from './fetchRequest';
import { sortBy } from 'lodash';
import {VariableDataType} from "./types";

export const searchVariables = async (): Promise<VariableDataType[]> => {
  const res = await fetchRequest(`/vehicles/GetVehicleVariableList?format=json`);

  const variablesColl = await res['Results'].map((variableData: {Description: string, Name: string, ID: number} ) => {
    const {
      Description: variableDescription,
      Name: variableName,
      ID: variableId
    } = variableData;

    const correctDescription = variableDescription.startsWith('<')
      ? variableDescription
      : `<p>${variableDescription}</p>`;

    return {
        variableDescription: correctDescription,
        variableName,
        variableId
      };
    });

  return sortBy(variablesColl, (o) => o.variableName);
};