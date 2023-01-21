import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export const GlobalContextProvider = ({ children }) => {
  const [responseHistory, setResponseHistory] = useState([]);
  const [recentVinCodes, setRecentVinCodes] = useState([]);
  const [currentVin, setCurrentVin] = useState('');
  const [variablesList, setVariablesList] = useState(null);


  const contextValue = {
    responseHistory,
    setResponseHistory,
    recentVinCodes,
    setRecentVinCodes,
    currentVin,
    setCurrentVin,
    variablesList,
    setVariablesList,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
  );
}