import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export const GlobalContextProvider = ({ children }) => {
  const [vinCodesInfo, setVinCodesInfo] = useState([]);
  const [recentVinCodes, setRecentVinCodes] = useState([]);
  const [currentVinInfo, setCurrentVinInfo] = useState('');
  const [variablesList, setVariablesList] = useState(null);


  const contextValue = {
    vinCodesInfo,
    setVinCodesInfo,
    recentVinCodes,
    setRecentVinCodes,
    currentVinInfo,
    setCurrentVinInfo,
    variablesList,
    setVariablesList,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
  );
}