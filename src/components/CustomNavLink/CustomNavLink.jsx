import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomNavLink.module.css'

export const CustomNavLink = ({ path, children }) => <Link className={styles.link} to={path}>{children}</Link>;