import React, { useContext, useState } from 'react';

import { NavLink, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { toast } from 'react-toastify';
import CreatorFieldV2 from '../../Components/CreatorFieldV2';
import { ContextApp } from '../../store/reducer';
import Loader from '../../Components/Loader';
import Breadcrumbs from '../../Components/Breadcrumbs';
import cls from '../../app.module.scss';

const MintNft = () => {
  const { collection } = useParams<any>();
  const [load, setLoad] = useState(false);
  const { toniumNFT, state } = useContext(ContextApp);
  const onSubmit = (values: any) => {
    setLoad(true);
    if (state.auth) {
      toniumNFT.actions
        .createUserCollectionToken(collection, values.name)
        .then((data: any) => {
          // eslint-disable-next-line no-console
          console.log(data, 'Success');
          toast.success('Success', {
            position: 'bottom-right',
            autoClose: 4000,
          });
          setLoad(false);
        })
        .catch((e: any) => {
          // eslint-disable-next-line no-console
          console.error(e.message);
          toast.error('Error', {
            position: 'bottom-right',
            autoClose: 4000,
          });
        });
    }
  };

  if (load) {
    return <Loader />;
  }
  return (
    <div>
      <Breadcrumbs>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collections"> Collections</NavLink>
        <NavLink to={`/collections/${collection}`}>Collection </NavLink>
        <Typography color="textPrimary">Mint NFT</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Mint NFT to the collection &quot;{collection}&quot;
        </Typography>
        <CreatorFieldV2 onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default MintNft;
