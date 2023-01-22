import { fetchRequest } from './fetchRequest';

export const searchVinCode = async (vin) => {
  const vinInfo = await fetchRequest(`/vehicles/DecodeVin/${vin}?format=json`);

  const { Message: message, Results: results } = await vinInfo;

  return { message, results };
};

