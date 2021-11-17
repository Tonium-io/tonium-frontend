import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
// import CristallIcon from '../../img/cristall.svg';
import AddIcon from '../../img/add.svg';
import ArrowIcon from '../../img/arrow.svg';
import HammerIcon from '../../img/hammer.svg';
import TimeIcon from '../../img/time.svg';
import CristalIcon from '../../img/cristall.svg';
import { ContextApp, setNftAuctions } from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';
import getShortToken from '../../utils/getShortToken';

import cls from './styles.module.scss';

type TokenItemType = {
  name: string;
  address: string;
  img: string;
  minted: string;
  addressWallet: string;
  action: string;
  transfer: string;
  addrData: string;
  addrOwner: string;
  addrRoot: string;
  defaultImage: string;
  metadata: {
    name: string;
    tokenFileAddress: {
      chunks: string;
      ipfs: string;
      extension: string;
      mime: string;
    };
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.typography,
        width: '100%',
        borderBottom: '1px solid #FF00E0',
      },
      ' & :before': {
        content: 'none',
      },
      ' & :after': {
        content: 'none',
      },
    },
  }),
);

const Token = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(ContextApp);
  const [load, setLoad] = useState(false);
  const classes = useStyles(0);
  const [sendModalOpen, setSendModalOpen] = useState(false);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = state.currentToken.token
        ? [state.currentToken.token]
        : [
            {
              addrData:
                '0:044f7425d70eb6235c38b39e35df2a03768950c1ee9bb54aeca5af407e0ccaee',
              addrOwner:
                '0:e2dfc131f72f5a09b1bb864c906c217b0cb464dd83fb878862d887476ed11fd2',
              addrRoot:
                '0:fad272271d63dc0fe7bfc29e31df2e56c977cd5efa85341d98604e8d4f7a7830',
              defaultImage: '/static/media/ton-logo.afa4d490.png',
              metadata: {
                name: 'IPFS',
                tokenFileAddress: {
                  ipfs: 'hi',
                },
              },
              name: 'TEST TOKEN #1',
              address: '38D9d1B10727bDc523f0EFb06CcA30E922a96fd6',
              img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
              addressWallet:
                '0:2eddab8c2a6b560d100ab6e04ef3f973d9bcb2e4e22d3bff6cdf4f5a4e827a20',
              minted: 'minted',
              action: 'bid win',
              transfer: 'transfer',
            },
          ];
      setNftAuctions(dispatch, payload);
      setLoad(false);
      // toast.success('Success', {
      //   position: 'bottom-right',
      //   autoClose: 4000,
      // });
    }
  }, []);

  const getBase64FromUrl = async (url: any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const download = async () => {
    let base64;
    if (state.currentToken.token.metadata.tokenFileAddress.chunks) {
      base64 = state.currentToken.token.metadata.tokenFileAddress.chunks;
    } else {
      base64 = await getBase64FromUrl(
        `https://ipfs.io/ipfs/${state.currentToken.token.metadata.tokenFileAddress.ipfs}`,
      );
    }

    const a = document.createElement('a');
    a.href = base64;
    a.download = 'Image.png';
    a.click();
  };

  if (load) {
    return <Loader />;
  }

  const handleSendModalClose = () => {
    setSendModalOpen(!sendModalOpen);
  };

  return (
    <div className={cls.tokenBody}>
      <Container className={cls.container}>
        <Breadcrumbs>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">...</NavLink>
          <NavLink to="../auction">
            {state.currentCollection?.name
              ? state.currentCollection?.name
              : 'sexy beast'}
          </NavLink>
        </Breadcrumbs>

        {state.nftAuctions.map((item: TokenItemType) => (
          <div className={cls.tokenPage}>
            <span className={cls.tokenName}>{item?.metadata?.name}</span>
            <span className={cls.tokenAdress}>
              {item.addrData.replace('0:', '')}
            </span>

            <form
              noValidate
              className={`${classes.root} ${cls.forms}`}
              autoComplete="off"
            >
              <div className={cls.wrapItem}>
                <div className={cls.wrapToken}>
                  <img
                    src={
                      `https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg`
                      // item.metadata.tokenFileAddress.chunks
                      //   ? item.metadata.tokenFileAddress.chunks
                      //   : `https://ipfs.io/ipfs/${item.metadata.tokenFileAddress.ipfs}`
                    }
                    className={cls.token}
                    id="downloadedID"
                    alt="downloaded img"
                  />
                  <span className={cls.downloadText}>Download original</span>
                  <div
                    className={cls.download}
                    onClick={download}
                    onKeyPress={() => {}}
                    role="presentation"
                  >
                    <input
                      className={cls.download}
                      type="file"
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                </div>

                <div className={cls.item}>
                  <div className={cls.description}>
                    <h2 className={cls.subtitle}>Description</h2>
                    <TextField
                      className={cls.formDescription}
                      id="standard-description"
                      placeholder="Description"
                    />
                  </div>

                  <div className={cls.description}>
                    <h2 className={cls.subtitle}>Current owner</h2>
                    <TextField
                      className={cls.formDescription}
                      id="standard-me"
                      placeholder="Me"
                    />
                  </div>

                  <div className={cls.wrapBtn}>
                    <button
                      className={cls.btn}
                      type="button"
                      onClick={handleSendModalClose}
                    >
                      Send
                    </button>
                    <button
                      className={cls.btn}
                      type="button"
                      onClick={() => history.push('/sellToken')}
                    >
                      Sell
                    </button>
                  </div>

                  <div className={cls.wrapHistory}>
                    <span className={cls.wrapSpan}>
                      <span className={cls.spanItem}>
                        <img src={AddIcon} alt="add" />
                        <span className={cls.action}>minted</span>
                        <span className={cls.tokenNameHistory}>
                          {item?.metadata.name}
                        </span>
                        <span className={cls.where}>by</span>
                        <span className={cls.userAdres}>
                          {getShortToken(item.addrOwner)}
                        </span>
                      </span>
                      <span className={cls.date}>17:01 14.05.2021</span>
                    </span>

                    <span className={cls.wrapSpan}>
                      <span className={cls.spanItem}>
                        <img src={HammerIcon} alt="add" />
                        <span className={cls.action}>bid win</span>
                        <span className={cls.tokenNameHistory}>
                          {item?.metadata.name}
                        </span>
                        <span className={cls.where}>by</span>
                        <span className={cls.userAdres}>
                          {getShortToken(item.addrOwner)}
                        </span>
                      </span>
                      <span className={cls.date}>17:01 14.05.2021</span>
                    </span>

                    <span className={cls.wrapSpan}>
                      <span className={cls.spanItem}>
                        <img src={ArrowIcon} alt="add" />
                        <span className={cls.action}>transfer</span>
                        <span className={cls.tokenNameHistory}>
                          {item.metadata.name}
                        </span>
                        <span className={cls.where}>from</span>
                        <span className={cls.userAdres}>
                          {getShortToken(item.addrOwner)}
                        </span>
                        <span className={cls.where}>to</span>
                        <span className={cls.userAdres}>
                          {getShortToken(item.addrOwner)}
                        </span>
                      </span>
                      <span className={cls.date}>17:01 14.05.2021</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className={cls.itemAuction}>
                <span className={cls.popupText}>Item on auction!</span>
                <div className={cls.time}>
                  <img src={TimeIcon} className={cls.timeImg} alt="Time" />
                  232:21
                </div>
                <div className={cls.price}>
                  8
                  <img
                    src={CristalIcon}
                    className={cls.priceImg}
                    alt="Cristal"
                  />
                  last bid
                </div>
                <button className={`${cls.btn} ${cls.popupBtn}`} type="button">
                  BID
                </button>
              </div>
            </form>
          </div>
        ))}
        <Dialog onClose={() => handleSendModalClose} open={sendModalOpen}>
          <Grid item xs={12} className={cls.sendModal}>
            <DialogTitle>
              <div className={cls.sendModalContainer}>
                <h2 className={cls.subtitle}>Enter Receiver Address</h2>
                <TextField
                  className={cls.formDescription}
                  id="standard-description"
                  placeholder="Address"
                />
              </div>
            </DialogTitle>
            <DialogActions>
              <Button variant="outlined" onClick={handleSendModalClose}>
                OK
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </Container>
    </div>
  );
};

export default Token;
