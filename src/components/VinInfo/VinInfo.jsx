import React, { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import styles from './VinInfo.module.css';
import { Spinner } from '../Spinner/Spinner';

export const VinInfo = () => {
  const {
    vinCodesInfo,
    recentVinCodes,
    setCurrentVin,
    currentVin,
  } = useContext(GlobalContext);

  const handleClickVin = (vin) => {
    setCurrentVin(vin);
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
          {
            vinCodesInfo.hasOwnProperty(currentVin)
              ? (
                  <>
                    <h3>
                      Результаты расшифровки текущего VIN ({currentVin}):
                    </h3>
                    <h4>
                      Сообщение:
                    </h4>
                    <p>
                      {vinCodesInfo[currentVin].message}
                    </p>
                    <ul>
                      {
                        vinCodesInfo[currentVin].results.map(({Value, Variable, VariableId}) => {
                          return (
                              <li key={VariableId}>
                                {`${Variable}: ${Value}`}
                              </li>
                          );
                        })
                      }
                    </ul>
                  </>
                )
              : <Spinner/>
          }
        </div>
      </div>
  );
};
