import React, {createContext, PropsWithChildren, useState} from 'react';
import {SetStateArgType, VariableDataType} from "../services/types";

type VariableContextValueType = {
  variables: VariableDataType[] | null,
  setVariables: (arg: SetStateArgType<VariableDataType[] | null>) => void,
  isDownloadedVars: boolean,
  setIsDownloadedVars: (arg: SetStateArgType<boolean>) => void,
}

export const VariablesContext = createContext({} as VariableContextValueType);

export const VariablesContextProvider = ({ children }: PropsWithChildren) => {
  const [variables, setVariables] = useState<VariableDataType[] | null>(null);
  const [isDownloadedVars, setIsDownloadedVars] = useState<boolean>(!!variables);

  const contextValue = {
    variables,
    setVariables,
    isDownloadedVars,
    setIsDownloadedVars,
  };


  return (
      <VariablesContext.Provider value={contextValue}>
        {children}
      </VariablesContext.Provider>
  );
};