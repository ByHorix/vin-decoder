import React, {PropsWithChildren} from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomNavLink.module.scss';

interface CustomNavLinkProps extends PropsWithChildren {
    path: string;
}

export const CustomNavLink = ({ path, children }: CustomNavLinkProps) => <Link className={styles.link} to={path}>{children}</Link>;