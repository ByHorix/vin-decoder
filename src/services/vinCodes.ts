import { fetchRequest } from './fetchRequest';
import {filterResults} from "../utils/filterResults";

export const searchVinCode = async (vin: string) => {
  const vinInfo = await fetchRequest(`/vehicles/DecodeVin/${vin}?format=json`);

  const { Message: message, Results: results } = vinInfo;
  const filteredResults = filterResults(results);

  return { message, results: filteredResults };
};

