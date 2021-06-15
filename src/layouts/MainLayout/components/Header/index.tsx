import React, { useContext, useEffect, useState } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import PanToolIcon from '@material-ui/icons/PanTool';
import NativeSelect from '@material-ui/core/NativeSelect';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import { ContextApp, setLogin, setOpen } from '../../../../store/reducer';
import Loader from '../../../../Components/Loader';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { state, dispatch, toniumNFT } = useContext(ContextApp);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<Number>();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      const provider = toniumNFT.getCurrentProvider();
      const setInitialData = async () => {
        const addr = await provider.getAddress();
        const bln = await provider.getBalance();
        setAddress(addr);
        setBalance(bln);
        setLoad(false);
      };

      setInitialData();
    }
  }, [state.auth]);

  return (
    <>
      {load && <Loader global />}
      <AppBar position="sticky" className={styles.header}>
        <Toolbar>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid container spacing={1} item alignItems="center">
              <Grid item>
                <PanToolIcon style={{ fontSize: 14, marginTop: 5 }} />
              </Grid>
              <Grid item>
                <NativeSelect
                  name="whitelist"
                  inputProps={{ 'aria-label': 'whitelist' }}
                >
                  <option value={10}>Main Whitelist</option>
                  <option value={20}>Show all</option>
                </NativeSelect>
              </Grid>
              <Grid item>
                <NavLink className={styles.whatIsItLink} to="/wp">
                  What is it?
                </NavLink>
              </Grid>
            </Grid>

            {state.auth ? (
              <Grid
                container
                item
                spacing={1}
                direction="row"
                alignItems="center"
                wrap="nowrap"
              >
                <Grid item>
                  <TextField
                    label="Balance (rubys)"
                    variant="filled"
                    value={balance || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="address"
                    variant="filled"
                    value={address || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      toniumNFT.providerLogout();
                      setLogin(dispatch, false);
                    }}
                  >
                    Log Out
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(dispatch, true)}
                >
                  Login
                </Button>
              </Grid>
            )}
            <Grid container item justify="flex-end">
              <NativeSelect name="lang" inputProps={{ 'aria-label': 'lang' }}>
                <option value={10}>EN</option>
              </NativeSelect>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
