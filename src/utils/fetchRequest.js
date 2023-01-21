import { filterResults } from './filterResults';

const fetchRequest = async (vin, setResponseHistory) => {
  const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`);
  // const res = await fetch(`https://vpic.nhtsa.dot.gov/api//vehicles/GetVehicleVariableList?format=json`);
  const data = await res.json();
  console.log(data);
  setResponseHistory((prevState) => [{ vin,message: data['Message'] , results: filterResults(data['Results']) }, ...prevState]);
};

export default fetchRequest;