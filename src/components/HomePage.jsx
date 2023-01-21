import React, { useContext, useState } from 'react';
import { isValid } from '../utils/isValid';
import cn from '../utils/classNames';
import { GlobalContext } from '../store/GlobalContext';
import { RecentResponsesList } from './RecentResponsesList';
import { filterResults } from '../utils/filterResults';
import { searchVinCode } from '../services/vinCodes';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValidInp, setIsValidInp] = useState(true);

  const {
    responseHistory,
    setResponseHistory,
    recentVinCodes,
    setRecentVinCodes,
    setCurrentVin,
  } = useContext(GlobalContext);

  const handleOnchange = ({ target: { value } }) => {
    setInputValue(value.toUpperCase());
    setIsValidInp(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid(inputValue)) {
      setInputValue('');

      if (!recentVinCodes.includes(inputValue)) {
        const data = await searchVinCode(inputValue);

        setCurrentVin(inputValue);
        setResponseHistory((prevState) => [{ vin: inputValue, message: data['Message'] , results: filterResults(data['Results']) }, ...prevState]);
        setRecentVinCodes((prevValue) => [inputValue, ...prevValue]);
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
        <div>
          <Link className={'link'} to={'/variables'}>Список всех возможных переменных</Link>
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