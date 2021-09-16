import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import { ContextApp, setUserCollectionTokens } from '../../store/reducer';
import tonLogo from '../../img/ton-logo.png';
import Loader from '../../Components/Loader';
import TableFields from '../../Components/TableFields';
import Breadcrumbs from '../../Components/Breadcrumbs';
import cls from '../../app.module.scss';

const Collection = () => {
  const { collection } = useParams<any>();
  const { state, dispatch, toniumNFT } = useContext(ContextApp);
  const { userCollectionTokens }: any = state;
  const [load, setLoad] = useState(false);
  const [collName, setCollName] = useState('');

  useEffect(() => {
    if (state.auth) {
      const collectionData = state.userCollections?.find(
        (c: any) => c.address === `0:${collection}`,
      );
      setCollName(collectionData ? collectionData.name : collection);
    }
  }, []);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      toniumNFT.actions.getInfoTokens(`0:${collection}`).then((data: any) => {
        // eslint-disable-next-line no-console
        // console.log(data);
        const newData = data.map((i: any) => ({
          ...i,
          defaultImage: tonLogo,
        }));
        setUserCollectionTokens(dispatch, newData);
        setLoad(false);
      });
    }
  }, []);

  return (
    <>
      {load && <Loader />}
      <Breadcrumbs>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collections">Collections</NavLink>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          {`Collection ${collName || ''}`}
        </Typography>
        <TableFields
          arrayItems={userCollectionTokens}
          linkCreator={`/collections/${collection}/mint-add`}
        />
      </div>
    </>
  );
};

export default Collection;
