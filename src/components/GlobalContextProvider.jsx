import React, { useContext, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { MainScreen } from './MainScreen';

export const GlobalContextProvider = () => {
  const [responseHistory, setResponseHistory] = useState([]);
  const [recentVinCodes, setRecentVinCodes] = useState([]);


  const contextValue = {
    responseHistory,
    setResponseHistory,
    recentVinCodes,
    setRecentVinCodes,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        <MainScreen/>
      </GlobalContext.Provider>
  );
}