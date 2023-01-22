import React, { useContext, useState } from 'react';
import { isValid } from '../../utils/isValid';
import cn from '../../utils/classNames';
import { GlobalContext } from '../../store/GlobalContext';
import { VinInfo } from '../VinInfo/VinInfo';
import { filterResults } from '../../utils/filterResults';
import { searchVinCode } from '../../services/vinCodes';
import { Header } from '../Header/Header';
import styles from './HomePage.module.css';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import { findCurrentVinInfo } from '../../utils/findCurrentVinInfo';

export const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValidInp, setIsValidInp] = useState(true);

  const {
    vinCodesInfo,
    setVinCodesInfo,
    recentVinCodes,
    setRecentVinCodes,
    setCurrentVinInfo,
  } = useContext(GlobalContext);

  const handleOnchange = ({ target: { value } }) => {
    setInputValue(value.toUpperCase());
    setIsValidInp(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid(inputValue)) {

      if (!recentVinCodes.includes(inputValue)) {
        const data = await searchVinCode(inputValue);

        setCurrentVinInfo({
          vin: inputValue,
          message: data.message,
          results: filterResults(data.results)
        });
        setVinCodesInfo((prevState) => [
          {
            vin: inputValue,
            message: data.message,
            results: filterResults(data.results)
          },
          ...prevState
        ]);
        setRecentVinCodes((prevValue) => [inputValue, ...prevValue]);
      }
      else {
        setCurrentVinInfo(findCurrentVinInfo(vinCodesInfo, inputValue));
      }

      setInputValue('');
    } else {
      setIsValidInp(false);
    }
  };

  return (
      <>
        <Header>
          <nav>
            <CustomNavLink path={'/variables'}>Список всех переменных</CustomNavLink>
          </nav>
        </Header>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor={'vin'}>Введите VIN-номер:</label>
            </div>
            <div>
              <input
                  className={cn(styles.input, { [styles.invalidInput]: !isValidInp })}
                  onChange={handleOnchange}
                  type="text"
                  name={'vin'}
                  value={inputValue}
              />
              <button className={styles.btn} type={'submit'}>
                Отправить
              </button>
            </div>
          </form>
          <div className={styles.error}>
            {
              (isValidInp)
                  ? null
                  : 'Поле не должно быть пустым, содержать недопустимые символы, не более 17 символов'
            }
          </div>
          <hr/>
          {
            vinCodesInfo.length > 0
                ? <VinInfo/>
                : null
          }
        </div>
      </>
  );

};