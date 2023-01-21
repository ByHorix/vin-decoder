import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { refactorVinList } from '../utils/refactorVinList';

export const RecentResponsesList = () => {
  const {
    responseHistory,
    recentVinCodes,
    setRecentVinCodes,
    setResponseHistory,
  } = useContext(GlobalContext);

  const handleOnclickVin = (currentVin) => {
    if (currentVin !== recentVinCodes[0]) {
      setRecentVinCodes((prevValue) => [currentVin, ...prevValue.filter((vin) => vin !== currentVin)]);
      setResponseHistory(refactorVinList(responseHistory, currentVin));
    }
  }

  return (
      <div className={'responses'}>
        <div className={'vin-list'}>
          <h3>
            Последние запросы:
          </h3>
          <ul>
            {
              recentVinCodes.map((vin) =>
                  (
                      <li className={'switch-last-vin'} onClick={() => handleOnclickVin(vin)} key={vin}>{vin}</li>
                  )
              ).slice(0, 4)
            }
          </ul>
        </div>
        <div className={'current-vin-response'}>
          <h3>
            Результаты расшифровки текущего VIN:
          </h3>
          <h4>
            Сообщение:
          </h4>
          <p>
            {responseHistory[0].message}
          </p>
            <ul>
              {
                responseHistory[0].results.map(({Value, Variable, VariableId}) => {
                  return (
                      <li key={VariableId}>
                        {`${Variable}: ${Value}`}
                      </li>
                  );
                })
              }
            </ul>
        </div>
      </div>
      );
};
