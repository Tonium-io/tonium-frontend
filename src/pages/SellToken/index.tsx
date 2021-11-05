import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import CristallIcon from '../../img/cristall.svg';
import { ContextApp, setNftAuctions } from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';

import cls from './styles.module.scss';

type TokenItemType = {
  // name: string;
  // address: string;
  // img: string;
  // minted: boolean;
  addrRoot: string;
  addrOwner: string;
  addrData: string;
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
        tableLayout: 'fixed',
      },
      ' & :before': {
        content: 'none',
      },
      ' & :after': {
        content: 'none',
      },
      '& :nth-child(1)': {
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '16px',
        color: '#000000',
      },
    },
    date: {
      '& .MuiTextField-root': {
        margin: theme.typography,
        width: '100%',
        borderBottom: '1px solid #FF00E0',
        tableLayout: 'fixed',
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

const SellToken = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [load, setLoad] = useState(false);
  const classes = useStyles(0);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = state.currentSellToken.token
        ? [state.currentSellToken.token]
        : [
            {
              // name: 'sell TEST TOKEN #1',
              // address: '38D9d1B10727bDc523f0EFb06CcA30E922a96fd6',
              // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
              // minted: true,
              addrRoot:
                '0:fad272271d63dc0fe7bfc29e31df2e56c977cd5efa85341d98604e8d4f7a7830',
              addrOwner:
                '0:e2dfc131f72f5a09b1bb864c906c217b0cb464dd83fb878862d887476ed11fd2',
              addrData:
                '0:3c5a0bbc4c9951f6c93f29e4589178545d2eee1900c121206b1bd7ca9422cacd',
              metadata: {
                name: 'sell TEST TOKEN #1',
                tokenFileAddress: {
                  chunks:
                    'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
                  extension: 'png',
                  mime: 'image/png',
                },
              },
            },
          ];
      setNftAuctions(dispatch, payload);
      setLoad(false);
      toast.success('Success', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }
  }, []);

  if (load) {
    return <Loader />;
  }

  return (
    <div className={cls.auction}>
      <Container className={cls.container}>
        <Breadcrumbs>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">...</NavLink>
          <NavLink to="../auction">sexy beast</NavLink>
        </Breadcrumbs>

        {state.nftAuctions.map((item: TokenItemType) => (
          <div className={cls.wrapToken}>
            <span className={cls.tokenName}>{item.metadata.name}</span>
            <span className={cls.token}>{item.addrData}</span>

            <div className={cls.wrapItem}>
              <div className={cls.three}>
                <img
                  src={
                    item.metadata.tokenFileAddress.chunks
                      ? item.metadata.tokenFileAddress.chunks
                      : `https://ipfs.io/ipfs/${item.metadata.tokenFileAddress.ipfs}`
                  }
                  className={cls.threeImg}
                  id="downloadedID"
                  alt="downloaded img"
                />
              </div>

              {/* <div className={cls.wrapToken}>

              </div> */}

              <div className={cls.item}>
                <div className={cls.wrapDescription}>
                  <h2 className={cls.subtitle}>Description</h2>
                  <form noValidate className={classes.root} autoComplete="off">
                    <TextField
                      className={cls.wrapdesc}
                      id="standard-basic"
                      placeholder="Description"
                    />

                    <div className={cls.wrapPrice}>
                      <div className={cls.price}>
                        <h2 className={`${cls.subtitle} ${cls.setPrice}`}>
                          SET PRICE
                        </h2>
                        <div className={`${classes.root} ${cls.wrapRoot}`}>
                          <TextField
                            id="standard-number"
                            type="number"
                            className={cls.formPrice}
                            defaultValue="200000"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <img src={CristallIcon} alt="Cristall" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <button type="button" className={cls.btn}>
                  sell
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default SellToken;
