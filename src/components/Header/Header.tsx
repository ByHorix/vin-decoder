import React, {PropsWithChildren} from 'react';
import styles from './Header.module.scss';

export const Header = ({ children }: PropsWithChildren) => {
  return (
      <header className={styles.header}>
        {children}
      </header>
  );
};