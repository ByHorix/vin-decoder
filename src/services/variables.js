import { fetchRequest } from './fetchRequest';
import { sortBy } from 'lodash';


export const searchVariables = async () => {
  const res = await fetchRequest(`/vehicles/GetVehicleVariableList?format=json`);

  const variablesColl = await res['Results'].map((variableData) => {
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