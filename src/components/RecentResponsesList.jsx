import React, { useContext } from 'react';
import { GlobalContext } from '../store/GlobalContext';

export const RecentResponsesList = () => {
  const {
    responseHistory,
    recentVinCodes,
    setCurrentVin,
    currentVin,
  } = useContext(GlobalContext);

  const handleClickVin = (currentVin) => {
    setCurrentVin(currentVin);
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
                      <li className={'switch-last-vin'} onClick={() => handleClickVin(vin)} key={vin}>{vin}</li>
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
                responseHistory.find(({vin}) => vin === currentVin).results.map(({Value, Variable, VariableId}) => {
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
