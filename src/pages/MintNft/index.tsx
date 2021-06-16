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
import { zeroAddress } from '../../constants';

const MintNft = () => {
  const history = useHistory();
  const { collection } = useParams<any>();
  const [load, setLoad] = useState(false);
  const { toniumNFT, state } = useContext(ContextApp);

  const onSubmit = async (values: any) => {
    if (!state.auth) return;

    setLoad(true);

    const img = values.image[0];
    const fl = values.fullFile[0];
    let tokenData: any = {
      description: values.symbol,
    };
    let tokenFileAddress = zeroAddress;
    if (values.checkbox === 'ipfs') {
      const node = await IPFS.create();
      const image = await node.add(img);
      const file = await node.add(fl);
      tokenData = {
        ...tokenData,
        image: image.path,
        file: file.path,
      };
    }

    if (values.checkbox === 'blockchain') {
      // const imgAsArrayBuffer = await img.arrayBuffer();
      const readerPromise: Promise<string> = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(img);
      });
      const imgAsString = await readerPromise;
      const imgStringAsHex = web3Utils.utf8ToHex(imgAsString).replace('0x', '');
      const chunks: string[] = [];
      for (let start = 0; start < imgStringAsHex.length; start += 15000) {
        const chunk = imgStringAsHex.slice(start, start + 15000);
        chunks.push(chunk);
      }
      tokenFileAddress = await toniumNFT.actions.createUserCollectionTokenFile(
        chunks,
        (addr: string, value: number) => {
          // eslint-disable-next-line no-console
          console.log(addr, value);
        },
      );
    }
    // if (state.auth) return;

    toniumNFT.actions
      .createUserCollectionToken(
        `0:${collection}`,
        values.name,
        tokenData,
        tokenFileAddress,
      )
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
