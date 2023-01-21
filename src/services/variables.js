import { fetchRequest } from './fetchRequest';

export const searchVariables = async () => {
  const res = await fetchRequest(`/vehicles/GetVehicleVariableList?format=json`);

  return res;
};