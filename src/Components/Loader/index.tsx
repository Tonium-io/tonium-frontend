import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles.module.scss';

interface LoaderProps {
  global?: boolean | undefined;
}
const Loader: React.FC<LoaderProps> = ({ global }) => (
  <div className={`${styles.loader}${global ? ` ${styles.global}` : ''}`}>
    <CircularProgress className={styles.progress} />
  </div>
);

export default Loader;
