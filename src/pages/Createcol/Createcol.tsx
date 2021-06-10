import React, { useContext, useState } from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import ListItem from '@material-ui/core/ListItem';
// import Skeleton from '@material-ui/lab/Skeleton';

import { toast } from 'react-toastify';

import Loader from '../../Components/Loader';
import { ContextApp, setSendMoneyDialog } from '../../store/reducer';

import CreatorField from '../../Components/CreatorField';

import cls from '../../app.module.scss';

const CreateCol = () => {
  const [load, setLoad] = useState(false);
  const { toniumNFT, state, dispatch } = useContext(ContextApp);

  const noMoneyFallback = (addr: string, value: number) => {
    setSendMoneyDialog(dispatch, { visible: true, addr, value });
  };

  const onSubmit = (values: any) => {
    if (state.auth) {
      setLoad(true);
      toniumNFT.actions
        .createUserCollections(values.name, values.symbol, noMoneyFallback)
        .then((data: any) => {
          // eslint-disable-next-line no-console
          console.log(data, 'Success');
          toast.success('Success', {
            position: 'bottom-right',
            autoClose: 4000,
          });
        })
        .catch((e: any) => {
          // eslint-disable-next-line no-console
          console.error(e.message);
          toast.error('Error', {
            position: 'bottom-right',
            autoClose: 4000,
          });
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };

  return (
    <>
      {load && <Loader />}
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collections"> Collections</NavLink>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Create Collection
        </Typography>

        <CreatorField onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default CreateCol;
