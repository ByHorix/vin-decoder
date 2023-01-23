import React, { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import styles from './VinInfo.module.css';
import { findCurrentVinInfo } from '../../utils/findCurrentVinInfo';

export const VinInfo = () => {
  const {
    vinCodesInfo,
    recentVinCodes,
    setCurrentVinInfo,
    currentVinInfo,
  } = useContext(GlobalContext);

  const handleClickVin = (currentVin) => {
    setCurrentVinInfo(findCurrentVinInfo(vinCodesInfo, currentVin));
  };

  return (
      <div className={styles.responses}>
        <div className={styles.vinList}>
          <h3>
            Последние запросы:
          </h3>
          <ul className={styles.lastVinList}>
            {
              recentVinCodes.slice(0, 5).map((vin) =>
                  (
                      <li
                          className={styles.switchCurrentVin}
                          onClick={() => handleClickVin(vin)}
                          key={vin}
                      >
                        {vin}
                      </li>
                  )
              )
            }
          </ul>
        </div>
        <div className={styles.currentVinResponse}>
          <h3>
            Результаты расшифровки текущего VIN:
          </h3>
          <h4>
            Сообщение:
          </h4>
          <p>
            {currentVinInfo.message}
          </p>
            <ul>
              {
                currentVinInfo.results.map(({Value, Variable, VariableId}) => {
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
