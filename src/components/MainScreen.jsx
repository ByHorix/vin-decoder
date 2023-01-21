import React, { useContext, useState } from 'react';
import { isValid } from '../utils/isValid';
import cn from '../utils/classNames';
import fetchRequest from '../utils/fetchRequest';
import { GlobalContext } from './GlobalContext';
import { RecentResponsesList } from './RecentResponsesList';
import { refactorVinList } from '../utils/refactorVinList';

export const MainScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValidInp, setIsValidInp] = useState(true);

  const {
    responseHistory,
    setResponseHistory,
    recentVinCodes,
    setRecentVinCodes,
  } = useContext(GlobalContext);

  const handleOnchange = (e) => {
    e.preventDefault();
    const { target: { value } } = e;

    setInputValue(value.toUpperCase());
    setIsValidInp(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid(inputValue)) {
      setRecentVinCodes((prevValue) => [inputValue, ...prevValue.filter((vin) => vin !== inputValue)]);
      setInputValue('');

      if (!recentVinCodes.includes(inputValue)) {
        fetchRequest(inputValue, setResponseHistory);
      }
      else {
        setResponseHistory(refactorVinList(responseHistory, inputValue));
      }
    }
    else {
      setIsValidInp(false);
    }
  };

  return (
      <div className={'container'}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor={'vin'}>Введите VIN-номер:</label>
          </div>
          <div>
            <input
                className={cn({ 'invalid': !isValidInp })}
                onChange={handleOnchange}
                type="text"
                name={'vin'}
                value={inputValue}
            />
            <button className={'btn'} type={'submit'}>
              Отправить
            </button>
          </div>
        </form>
        <div className={'error'}>
          {
            (isValidInp)
                ? null
                : 'Поле не должно быть пустым, содержать недопустимые символы, не более 17 символов'
          }
        </div>
        <hr/>
        {
          responseHistory.length > 0
              ? <RecentResponsesList/>
              : null
        }
      </div>
  );

};