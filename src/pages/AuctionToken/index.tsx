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
  name: string;
  address: string;
  img: string;
  minted: boolean;
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
            <span className={cls.tokenName}>{item.name}</span>
            <span className={cls.token}>{item.address}</span>

            <div className={cls.wrapItem}>
              <div className={cls.three} />

              <div className={cls.item}>
                <h2 className={cls.subtitle}>Description</h2>
                <form noValidate className={classes.root} autoComplete="off">
                  <TextField
                    className={cls.wrapdesc}
                    id="standard-basic"
                    placeholder="Description"
                  />

                  <div className={cls.wrapPrice}>
                    <div className={cls.price}>
                      <h2 className={cls.subtitle}>SET start PRICE</h2>
                      <div className={`${classes.root} ${cls.wrapFormPrice}`}>
                        <TextField
                          id="standard-number"
                          type="number"
                          className={cls.formPrice}
                          defaultValue="2000000"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <img src={CristallIcon} alt="Cristall" />
                      </div>
                    </div>

                    <div className={cls.step}>
                      <h2 className={cls.subtitle}>SET STEP</h2>
                      <div className={`${classes.root} ${cls.wrapFormPrice}`}>
                        <TextField
                          id="standard-number"
                          type="number"
                          defaultValue="200"
                          className={cls.formPrice}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <img src={CristallIcon} alt="Cristall" />
                      </div>
                    </div>

                    <h2 className={cls.subtitle}>SET finish date and time</h2>
                    <div className={cls.date}>
                      <div className={cls.formTime}>
                        <TextField
                          id="time"
                          type="time"
                          className={classes.root}
                          defaultValue="00:00"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300,
                          }}
                        />
                      </div>
                      <div className={cls.formDate}>
                        <TextField
                          id="date"
                          type="date"
                          className={classes.root}
                          defaultValue="2021-12-12"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                    </div>
                    <button type="button" className={cls.btn}>
                      {' '}
                      start AUCTION{' '}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AuctionToken;
