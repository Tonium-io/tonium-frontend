import React, { useState } from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import ListItem from '@material-ui/core/ListItem';
// import Skeleton from '@material-ui/lab/Skeleton';

import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';

import cls from '../../app.module.scss';
import CreatorField from '../../Components/CreatorField';

const MintNft = () => {
  const { collection } = useParams<any>();
  const [load, setLoad] = useState(false);
  const onSubmit = (values: any) => {
    setLoad(true);
    // eslint-disable-next-line no-console
    console.log(values, 'Success');
    toast.success('Success', {
      position: 'bottom-right',
      autoClose: 4000,
    });
  };

  if (load) {
    return <Loader />;
  }
  return (
    <div>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collections"> Collections</NavLink>
        <NavLink to={`/collections/${collection}`}>Collection </NavLink>
        <Typography color="textPrimary">Mint NFT</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Mint NFT
        </Typography>

        <CreatorField onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default MintNft;
