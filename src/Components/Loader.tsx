import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import cls from '../app.module.scss';

const Loader = () => (
  <div className={cls.loader}>
    <CircularProgress className={cls.progress} />
  </div>
);

export default Loader;
