import { Breadcrumbs, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ContextApp, setUserCollenctionTokens } from '../../store/reducer';

import Loader from '../../Components/Loader';
import TableFields from '../../Components/TableFields';
import cls from '../../app.module.scss';

const Collection = () => {
  const { collection } = useParams<any>();
  // eslint-disable-next-line no-console
  console.log(collection, 'Col');
  // todo radar page
  const { state, dispatch } = useContext(ContextApp);
  const { userCollectionTokens }: any = state;
  const [load, setLoad] = useState(false);
  const [collName, setCollName] = useState('');
  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        {
          name: 'Test1',
          address: '0:x12312312432534453',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
        },
        {
          name: 'Test2',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
        },
      ];
      setUserCollenctionTokens(dispatch, payload);
      setLoad(false);
      const nameCol = state.userCollections?.find(
        (c: any) => c.address === collection,
      )?.name;

      setCollName(nameCol);
    }
  }, []);

  if (load) {
    return <Loader />;
  }
  return (
    <div className={cls.mint}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collections">Collections</NavLink>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          {`Collection ${collName || ''}`}
        </Typography>
        <TableFields
          arrayItems={userCollectionTokens}
          linkCreator="/collections/:collection/mint-add"
        />
      </div>
    </div>
  );
};

export default Collection;
