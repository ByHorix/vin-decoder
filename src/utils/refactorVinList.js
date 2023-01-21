export const refactorVinList = (responseList, currentVin) => {
  const  currentResponse = responseList.filter(({vin}) => vin === currentVin);

  return [...currentResponse, ...responseList.filter(({ vin }) => vin !== currentVin)];
  };