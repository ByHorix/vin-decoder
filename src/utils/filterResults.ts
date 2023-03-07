import {VinDataType} from "../services/types";

export const filterResults = (results: VinDataType[]) => results.filter(({Value}: VinDataType) => Value);
