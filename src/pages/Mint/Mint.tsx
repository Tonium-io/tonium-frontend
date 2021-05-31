import React, { useContext, useEffect, useState } from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

// import Skeleton from '@material-ui/lab/Skeleton';

import { NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ContextApp, setUserCollenctions } from '../../store/reducer';
import TableFields from '../../Components/TableFields';
import Loader from '../../Components/Loader';

import cls from '../../app.module.scss';

const Mint = () => {
  // todo home page
  // eslint-disable-next-line no-console
  const { state, dispatch, toniumNFT } = useContext(ContextApp);

  const { userCollections }: any = state;
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      toniumNFT.actions.getUserCollections().then((data: any) => {
        console.log(data, 'Collection');
        const newData = data.map((i: any) => ({
          ...i,
          img: 'https://i.pinimg.com/originals/fb/16/f9/fb16f9c0afed2c195f4732c3f279b77a.jpg',
        }));
        setUserCollenctions(dispatch, newData);
        setLoad(false);
      });
      toast.success('Success', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }
  }, []);
  if (load) {
    return <Loader />;
  }
  // eslint-disable-next-line no-console
  console.log('Mint');
  return (
    <div className={cls.mint}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
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
    </div>
  );
};

export default Mint;
