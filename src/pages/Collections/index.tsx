import React, { useContext, useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';

// import Skeleton from '@material-ui/lab/Skeleton';

import { NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ContextApp, setUserCollections } from '../../store/reducer';
import TableFields from '../../Components/TableFields';
import Loader from '../../Components/Loader';
import Breadcrumbs from '../../Components/Breadcrumbs';

import cls from '../../app.module.scss';

const Collections = () => {
  const { state, dispatch, toniumNFT } = useContext(ContextApp);
  const { userCollections }: any = state;
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      toniumNFT.actions.getUserCollections().then((data: any) => {
        const newData = data.map((i: any) => ({
          ...i,
          img: 'https://i.pinimg.com/originals/fb/16/f9/fb16f9c0afed2c195f4732c3f279b77a.jpg',
        }));
        setUserCollections(dispatch, newData);
        setLoad(false);
      });
      toast.success('Success', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }
  }, []);

  return (
    <>
      {load && <Loader />}

      <Breadcrumbs>
        <NavLink to="/">Home</NavLink>
        <Typography color="textPrimary">Collections</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Collections
        </Typography>
        <TableFields
          arrayItems={userCollections}
          linkCreator="/collections/new"
          clickCollectionsUrl="collections"
        />
      </div>
    </>
  );
};

export default Collections;
