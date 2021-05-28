import React from 'react';
import { useParams } from 'react-router';

import cls from './Collection.module.scss';

const Collection = () => {
  const { collection } = useParams<any>();
  // eslint-disable-next-line no-console
  console.log(collection, 'Col');
  // todo radar page
  // eslint-disable-next-line no-console
  console.log('collection');
  return <div className={cls.collection}> this is Collection page</div>;
};

export default Collection;
