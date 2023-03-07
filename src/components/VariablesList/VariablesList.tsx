import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { searchVariables } from '../../services/variables';
import { VariablesContext } from '../../store/VariablesContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import styles from './VariablesList.module.scss';
import { Spinner } from '../Spinner/Spinner';
import {VariableDataType} from "../../services/types";

export const VariableList = () => {
  const {
    variables,
    setVariables,
  } = useContext(VariablesContext);

  const [variablesToShow, setVariablesToShow] = useState<VariableDataType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isVariablesToShowReady, setIsVariablesToShowReady] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const data = await searchVariables();

      setVariables(data);
      setVariablesToShow(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (variablesToShow.length > 0) {
      setIsVariablesToShowReady(true);
    }
  }, [variablesToShow]);

  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (variables) {
      setVariablesToShow(inputValue === '' ? variables : variables.filter(({ variableName }) => {
        return variableName
            .toLowerCase()
            .startsWith(inputValue.toLowerCase());
      }));
    }
  }, [inputValue]);

  const navigate = useNavigate();

  return (
      <>
        <Header>
          <nav>
            <CustomNavLink path={'/'}>Главная</CustomNavLink>
          </nav>
          <input
              className={styles.input}
              onChange={handleInputChange}
              type={'text'}
              placeholder={'Начните вводить имя переменной'}
              value={inputValue}/>
        </Header>
        <div className={styles.container}>
          {
            isVariablesToShowReady
                ? (
                    <>
                      <h3>Список характеристик и их значений:</h3>
                      {
                        variablesToShow.length === 0
                            ? <p>Переменной с именем {inputValue} не существует</p>
                            : (
                                <dl className={styles.variableList}>
                                  {variablesToShow.map(({ variableId, variableName, variableDescription }) => (
                                      <React.Fragment key={variableId}>
                                        <dt
                                            className={styles.variableName}
                                            onClick={() => navigate(`/variables/${variableId}`)}
                                        >
                                          {variableName}
                                        </dt>
                                        <dd className={styles.description}
                                            dangerouslySetInnerHTML={{ __html: variableDescription }}
                                        />
                                      </React.Fragment>
                                  ))}
                                </dl>
                            )
                      }
                    </>
                )
                : <Spinner/>
          }
        </div>
      </>
  );
};