import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { toast } from 'react-toastify';

import Typography from '@material-ui/core/Typography';

import tonLogo from '../../img/ton-logo.png';
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
        // eslint-disable-next-line no-console
        console.log('Collections: ', data);
        const newData = data.map((i: any) => ({
          ...i,
          defaultImage: tonLogo,
        }));
        setUserCollections(dispatch, newData);
        setLoad(false);
      });
      // toast.success('Success', {
      //   position: 'bottom-right',
      //   autoClose: 4000,
      // });
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
