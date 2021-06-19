import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Typography from '@material-ui/core/Typography';

import Loader from '../../Components/Loader';
import { ContextApp, setSendMoneyDialog } from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';
import cls from '../../app.module.scss';
import CreateForm from './components/CreateForm';

const CreateCollection = () => {
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const { toniumNFT, state, dispatch } = useContext(ContextApp);

  const noMoneyFallback = (addr: string, value: number) => {
    setSendMoneyDialog(dispatch, { visible: true, addr, value });
  };

  const onSubmit = ({ name, symbol }: any) => {
    if (state.auth) {
      setLoad(true);
      toniumNFT.actions
        .createUserCollections(name, symbol, noMoneyFallback)
        .then((data: any) => {
          // eslint-disable-next-line no-console
          console.log(data, 'Success');
          toast.success('Success', {
            position: 'bottom-right',
            autoClose: 4000,
          });
          history.push('/collections/');
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
      <Breadcrumbs>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collections"> Collections</NavLink>
        <Typography color="textPrimary">New</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Create Collection
        </Typography>
        <CreateForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default CreateCollection;
