import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import IPFS from 'ipfs';
import { toast } from 'react-toastify';

import Typography from '@material-ui/core/Typography';

import { ContextApp } from '../../store/reducer';
import Loader from '../../Components/Loader';
import Breadcrumbs from '../../Components/Breadcrumbs';
import { zeroAddress } from '../../constants';
import { isImageFile, utf8ToHex } from '../../helpers';
import cls from '../../app.module.scss';

import MintForm from './components/MintForm';

const MintNft = () => {
  const history = useHistory();
  const { collection } = useParams<any>();
  const [load, setLoad] = useState(false);
  const [collName, setCollName] = useState('');
  const { toniumNFT, state } = useContext(ContextApp);

  useEffect(() => {
    const nameCol = state.userCollections?.find(
      (c: any) => c.address === `0:${collection}`,
    )?.name;
    setCollName(nameCol);
  }, []);

  const onSubmit = async ({ name, symbol, files, checkbox }: any) => {
    if (!state.auth) return;

    setLoad(true);
    const file = files[0];
    let tokenData: any = {
      description: symbol,
    };
    let tokenFileAddress = zeroAddress;

    if (checkbox === 'ipfs') {
      const node = await IPFS.create();
      const isImage = isImageFile(file);
      const ipfsFile = await node.add(file);
      tokenData = isImage
        ? { ...tokenData, ipfsImage: ipfsFile.path }
        : { ...tokenData, ipfsFile: ipfsFile.path };
    }

    if (checkbox === 'blockchain') {
      const readerPromise: Promise<string> = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });

      const fileAsString = await readerPromise;
      const fileStringAsHex = utf8ToHex(fileAsString);
      const chunks: string[] = [];
      for (let start = 0; start < fileStringAsHex.length; start += 15000) {
        const chunk = fileStringAsHex.slice(start, start + 15000);
        chunks.push(chunk);
      }

      try {
        tokenFileAddress =
          await toniumNFT.actions.createUserCollectionTokenFile(
            chunks,
            (addr: string, value: number) => {
              // eslint-disable-next-line no-console
              console.log(addr, value);
            },
          );
      } catch (e) {
        setLoad(false);
        // eslint-disable-next-line no-console
        console.log(e);
        toast.error('Error', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }

    // if (state.auth) return;

    toniumNFT.actions
      .createUserCollectionToken(
        `0:${collection}`,
        name,
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
          Mint NFT to the collection &quot;{collName}&quot;
        </Typography>
        <MintForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default MintNft;
