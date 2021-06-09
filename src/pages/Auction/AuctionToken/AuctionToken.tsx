import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../Components/Loader';
import CristallIcon from '../../../img/cristall.svg';
import TimeIcon from '../../../img/time.svg';
import DateIcon from '../../../img/date.svg';
import { ContextApp, setNftAuctions } from '../../../store/reducer';

import cls from './AuctionToken.module.scss';

type TokenItemType = {
  name: string;
  address: string;
  img: string;
  description: string;
  minted: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '46px',
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

const AuctionToken = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [load, setLoad] = useState(false);
  const classes = useStyles(0);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        {
          name: 'auction TEST TOKEN #1',
          address: '38D9d1B10727bDc523f0EFb06CcA30E922a96fd6',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          description: 'Description',
          minted: true,
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
  // eslint-disable-next-line no-console
  console.log(state.nftAuctions, 'AUCTIONSTOKEN');
  if (load) {
    return <Loader />;
  }
  // eslint-disable-next-line no-console
  console.log('AuctionToken');
  return (
    <div className={cls.auction}>
      <Container className={cls.container}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">...</NavLink>
          <NavLink to="../auction">sexy beast</NavLink>
        </Breadcrumbs>

        {state.nftAuctions.map((item: TokenItemType) => (
          <div className={cls.WrapToken}>
            <span className={cls.TokenName}>{item.name}</span>
            <span className={cls.token}>{item.address}</span>

            <div className={cls.WrapItem}>
              <div
                className={cls.three}
                style={{ backgroundImage: `url(${item.img})` }}
              />

              <div className={cls.item}>
                <div className={cls.WrapDescription}>
                  <h2 className={cls.subtitle}>Description</h2>
                  <span className={`${cls.description} ${cls.wrapdesc}`}>
                    {item.description}
                  </span>
                </div>

                <div className={cls.WrapPrice}>
                  <div className={cls.price}>
                    <h2 className={cls.subtitle}>SET start PRICE</h2>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-number"
                        type="number"
                        className={cls.FormPrice}
                        defaultValue="200"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <img src={CristallIcon} alt="Cristall" />
                    </form>
                  </div>

                  <div className={cls.step}>
                    <h2 className={cls.subtitle}>SET STEP</h2>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-number"
                        type="number"
                        defaultValue="20"
                        className={cls.FormPrice}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <img src={CristallIcon} alt="Cristall" />
                    </form>
                  </div>

                  <h2 className={cls.subtitle}>SET finish date and time</h2>
                  <div className={cls.date}>
                    <form noValidate className={cls.FormTime}>
                      <TextField
                        id="time"
                        className={classes.root}
                        defaultValue="00:00"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300,
                        }}
                      />
                      <img src={TimeIcon} alt="Time" />
                    </form>
                    <form noValidate className={cls.FormDate}>
                      <TextField
                        id="date"
                        className={classes.root}
                        defaultValue="2021-12-12"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <img src={DateIcon} alt="Date" />
                    </form>
                  </div>
                  <NavLink to="#" className={cls.btn}>
                    {' '}
                    start AUCTION{' '}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AuctionToken;
