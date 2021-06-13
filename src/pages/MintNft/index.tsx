import React, { useContext, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import IPFS from 'ipfs';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';

import web3Utils from 'web3-utils';
import CreatorFieldV2 from '../../Components/CreatorFieldV2';
import { ContextApp } from '../../store/reducer';
import Loader from '../../Components/Loader';
import Breadcrumbs from '../../Components/Breadcrumbs';
import cls from '../../app.module.scss';

const MintNft = () => {
  const history = useHistory();
  const { collection } = useParams<any>();
  const [load, setLoad] = useState(false);
  const { toniumNFT, state } = useContext(ContextApp);

  const onSubmit = async (values: any) => {
    console.log(values);

    if (!state.auth) return;

    let tokenData: any;
    if (values.checkbox === 'ipfs') {
      const img = values.image[0];
      const fl = values.fullFile[0];
      const node = await IPFS.create();
      const image = await node.add(img);
      const file = await node.add(fl);
      tokenData = { description: values.symbol, image, file };
      console.log(tokenData);
    }
    // console.log(tokenData);
    console.log(web3Utils.utf8ToHex('ololo'));

    if (state.auth) return;

    setLoad(true);
    toniumNFT.actions
      .createUserCollectionToken(`0:${collection}`, values.name, 255, 'ololo')
      .then((data: any) => {
        // eslint-disable-next-line no-console
        console.log(data, 'Success');
        toast.success('Success', {
          position: 'bottom-right',
          autoClose: 4000,
        });
        setLoad(false);
        history.push(history.location.pathname.replace('/mint-add', ''));
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.log(e);
        toast.error('Error', {
          position: 'bottom-right',
          autoClose: 4000,
        });
        setLoad(false);
      });
  };

  return (
    <>
      {load && <Loader />}
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
    </>
  );
};

export default MintNft;
