import React, {createContext, PropsWithChildren, useState} from 'react';
import {VinDecodingType, SetStateArgType} from "../services/types";

type VinCodesInfoType = {
    [key: string]: VinDecodingType
}

type ContextValueType = {
  vinCodesInfo: VinCodesInfoType,
  setVinCodesInfo: (arg: SetStateArgType<VinCodesInfoType> ) => void,
  recentVinCodes: string[],
  setRecentVinCodes: (arg: SetStateArgType<string[]>) => void,
  currentVin: string,
  setCurrentVin: (arg: SetStateArgType<string>) => void,
}

export const GlobalContext = createContext({} as ContextValueType);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [vinCodesInfo, setVinCodesInfo] = useState<VinCodesInfoType>({});
  const [recentVinCodes, setRecentVinCodes] = useState<string[]>([]);
  const [currentVin, setCurrentVin] = useState<string>('');


  const contextValue = {
    vinCodesInfo,
    setVinCodesInfo,
    recentVinCodes,
    setRecentVinCodes,
    currentVin,
    setCurrentVin,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
  );
}