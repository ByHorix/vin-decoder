import React from 'react';
import styles from './Spinner.module.css';

export const Spinner = () => (
    <div className={styles['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>);