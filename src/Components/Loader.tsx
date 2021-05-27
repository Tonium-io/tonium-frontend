import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import cls from '../app.module.scss';

const Loader = () => {
  console.log('sss');
  return (
    <div className={cls.loader}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
