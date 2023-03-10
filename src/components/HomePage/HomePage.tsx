import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import { checkIsValid } from '../../utils/isValid';
import cn from 'classnames';
import { GlobalContext } from '../../store/GlobalContext';
import { VinInfo } from '../VinInfo/VinInfo';
import { searchVinCode } from '../../services/vinCodes';
import { Header } from '../Header/Header';
import styles from './HomePage.module.scss';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';

export const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValidInp, setIsValidInp] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const {
    setVinCodesInfo,
    recentVinCodes,
    setRecentVinCodes,
    setCurrentVin,
  } = useContext(GlobalContext);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.toUpperCase());
    if (isValidated) {
      setIsValidated(false);
    }
  };

  const validate = (inputValue: string): boolean => {
    const isValid = checkIsValid(inputValue);
    setIsValidated(true);
    setIsValidInp(isValid);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate(inputValue)) {
      setCurrentVin(inputValue);

      if (!recentVinCodes.includes(inputValue)) {
        const data = await searchVinCode(inputValue);

        setCurrentVin(inputValue);
        setVinCodesInfo((prevState) => ({
          ...prevState,
          [inputValue]: {
            message: data.message,
            results: data.results,
          },
      }));
        setRecentVinCodes((prevValue) => [inputValue, ...prevValue]);
      }

      setInputValue('');
    }
  };

  return (
      <>
        <Header>
          <nav>
            <CustomNavLink path={'/variables'}>Список характеристик</CustomNavLink>
          </nav>
        </Header>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor={'vin'}>Введите VIN-номер:</label>
            </div>
            <div>
              <input
                  className={cn([styles.input, { [styles.invalidInput]: !isValidInp && isValidated }])}
                  onChange={handleChange}
                  type="text"
                  name={'vin'}
                  value={inputValue}
              />
            </div>
            <div>
              <button className={styles.btn} type={'submit'}>
                Отправить
              </button>
            </div>
          </form>
          <div className={styles.error}>
            {
              (!isValidInp && isValidated)
                  ? 'Поле не должно быть пустым, содержать недопустимые символы, не более 17 символов'
                  : null
            }
          </div>
          <hr/>
          {
            recentVinCodes.length > 0
                ? <VinInfo/>
                : null
          }
        </div>
      </>
  );

};