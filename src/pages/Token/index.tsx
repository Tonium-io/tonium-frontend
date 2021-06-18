import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
// import CristallIcon from '../../img/cristall.svg';
import AddIcon from '../../img/add.svg';
import ArrowIcon from '../../img/arrow.svg';
import HammerIcon from '../../img/hammer.svg';
import TimeIcon from '../../img/time.svg';
import CristalIcon from '../../img/cristall.svg';
import { ContextApp, setNftAuctions } from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';

import cls from './styles.module.scss';

type TokenItemType = {
  name: string;
  address: string;
  img: string;
  minted: string;
  addressWallet: string;
  action: string;
  transfer: string;
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
  const { state, dispatch } = useContext(ContextApp);
  const [load, setLoad] = useState(false);
  const classes = useStyles(0);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        {
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
    <div className={cls.tokenBody}>
      <Container className={cls.container}>
        <Breadcrumbs>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">...</NavLink>
          <NavLink to="../auction">sexy beast</NavLink>
        </Breadcrumbs>

        {state.nftAuctions.map((item: TokenItemType) => (
          <div className={cls.tokenPage}>
            <span className={cls.tokenName}>{item.name}</span>
            <span className={cls.tokenAdress}>{item.address}</span>

            <form
              noValidate
              className={`${classes.root} ${cls.forms}`}
              autoComplete="off"
            >
              <div className={cls.wrapItem}>
                <div className={cls.wrapToken}>
                  <div className={cls.token} />
                  <span className={cls.downloadText}>Download original</span>
                  <input className={cls.download} type="file" />
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
                    <button className={cls.btn} type="button">
                      Send
                    </button>
                    <button className={cls.btn} type="button">
                      Sell
                    </button>
                  </div>

                  <div className={cls.wrapHistory}>
                    <span className={cls.wrapSpan}>
                      <span className={cls.spanItem}>
                        <img src={AddIcon} alt="add" />
                        <span className={cls.action}>{item.minted}</span>
                        <span className={cls.tokenNameHistory}>
                          {item.name}
                        </span>
                        <span className={cls.where}>by</span>
                        <span
                          className={cls.userAdres}
                        >{`${item.addressWallet.substring(0, 8)}
                        ...
                        ${item.addressWallet.substring(61, 66)}`}</span>
                      </span>
                      <span className={cls.date}>17:01 14.05.2021</span>
                    </span>

                    <span className={cls.wrapSpan}>
                      <span className={cls.spanItem}>
                        <img src={ArrowIcon} alt="add" />
                        <span className={cls.action}>{item.action}</span>
                        <span className={cls.tokenNameHistory}>
                          {item.name}
                        </span>
                        <span className={cls.where}>by</span>
                        <span
                          className={cls.userAdres}
                        >{`${item.addressWallet.substring(
                          0,
                          8,
                        )}...${item.addressWallet.substring(61, 66)}`}</span>
                      </span>
                      <span className={cls.date}>17:01 14.05.2021</span>
                    </span>

                    <span className={cls.wrapSpan}>
                      <span className={cls.spanItem}>
                        <img src={HammerIcon} alt="add" />
                        <span className={cls.action}>{item.transfer}</span>
                        <span className={cls.tokenNameHistory}>
                          {item.name}
                        </span>
                        <span className={cls.where}>from</span>
                        <span
                          className={cls.userAdres}
                        >{`${item.addressWallet.substring(
                          0,
                          8,
                        )}...${item.addressWallet.substring(61, 66)}`}</span>
                        <span className={cls.where}>to</span>
                        <span
                          className={cls.userAdres}
                        >{`${item.addressWallet.substring(
                          0,
                          8,
                        )}...${item.addressWallet.substring(61, 66)}`}</span>
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
      </Container>
    </div>
  );
};

export default Token;
