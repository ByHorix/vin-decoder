import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VariablesContext } from '../../store/VariablesContext';
import { searchVariables } from '../../services/variables';
import { findCurrentVar } from '../../utils/findCurrentVar';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import { Header } from '../Header/Header';
import styles from './VariableDescription.module.scss';
import { Spinner } from '../Spinner/Spinner';

export const VariableDescription = () => {
  const {
    variables,
  } = useContext(VariablesContext);

  const id = Number(useParams().id);
  const [currentVar, setCurrentVar] = useState(variables && findCurrentVar(variables, id));
  const [isDownloadedData, setIsDownloadedData] = useState(!!variables);

  useEffect(() => {
    if (!variables) {

      async function fetchData() {
        const data = await searchVariables();

        setCurrentVar(findCurrentVar(data, id));
        setIsDownloadedData(true);
      }

      fetchData();
    }
  }, []);

  return (
      <>
        <Header>
          <nav>
            <CustomNavLink path={'/'}>
              Главная
            </CustomNavLink>
            <CustomNavLink path={'/variables'}>
              Список характеристик
            </CustomNavLink>
          </nav>
        </Header>
        <div className={styles.container}>
          {
            isDownloadedData
                ? (<>
                  {
                    currentVar
                        ? (
                            <>
                              <h3>{currentVar.variableName}</h3>
                              <div dangerouslySetInnerHTML={{ __html: currentVar.variableDescription }}/>
                            </>
                        )
                        : <h3>Нет переменной с ID = {id}</h3>
                  }
                </>)
                : <Spinner/>
          }
        </div>
      </>
  );
};