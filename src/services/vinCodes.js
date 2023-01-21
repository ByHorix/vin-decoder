import { fetchRequest } from './fetchRequest';

export const searchVinCode = async (vin) => {
  const vinInfo = await fetchRequest(`/vehicles/DecodeVin/${vin}?format=json`);

  return vinInfo;
};

