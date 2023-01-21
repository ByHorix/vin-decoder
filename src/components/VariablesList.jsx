import React, { useContext, useEffect, useState } from 'react';
import { searchVariables } from '../services/variables';
import { VariablesContext } from '../store/VariablesContext';
import { useNavigate } from 'react-router-dom';

export const VariableList = () => {
  const {
    variables,
    setVariables,
    isDownloadedVars,
    setIsDownloadedVars,
  } = useContext(VariablesContext);

  useEffect(() => {
    async function fetchData() {
      const data = await searchVariables();

      setVariables(data);
      setIsDownloadedVars(true);
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
      isDownloadedVars
          ? (
              <div className={'container'}>
                <h3>Список переменных и их значений</h3>
                <dl className={'variable-list'}>
                  {variables['Results'].map(({ ID, Name, Description }) => (
                      <React.Fragment key={ID}>
                        <dt
                            className={'variable-name'}
                            onClick={() => navigate(`/variables/${ID}`)}
                        >
                          {Name}
                        </dt>
                        <dd
                            dangerouslySetInnerHTML={{__html: Description}}
                        />
                      </React.Fragment>
                  ))}
                </dl>
              </div>
          )
          : <h3> Loading...</h3>
  );
};