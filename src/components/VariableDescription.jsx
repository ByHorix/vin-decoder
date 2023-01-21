import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VariablesContext } from '../store/VariablesContext';
import { searchVariables } from '../services/variables';
import { findCurrentVar } from '../utils/findCurrentVar';

export const VariableDescription = () => {
  const {
    variables,
  } = useContext(VariablesContext);

  const { id } = useParams();
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
      isDownloadedData
      ? (
          <div className={'container'}>
            <h3>{currentVar['Name']}</h3>
            <div dangerouslySetInnerHTML={{ __html: currentVar['Description'] }}/>
          </div>
      )
          : <h3> Loading...</h3>
  );
};