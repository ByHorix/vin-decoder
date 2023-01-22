export const findCurrentVinInfo = (vinCodesInfo, currentVinCode) => {
  return vinCodesInfo.find(({ vin }) => vin === currentVinCode);
};