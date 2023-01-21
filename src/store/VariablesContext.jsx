import React, { createContext, useState } from 'react';

export const VariablesContext = createContext(null);

export const VariablesContextProvider = ({ children }) => {
  const [variables, setVariables] = useState(null);
  const [isDownloadedVars, setIsDownloadedVars] = useState(variables);

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