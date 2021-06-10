import React, { useContext, useEffect, useState } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import PanToolIcon from '@material-ui/icons/PanTool';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import { ContextApp, setLogin, setOpen } from '../../../../store/reducer';
import cls from '../../../../app.module.scss';
import Loader from '../../../../Components/Loader';

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
      <AppBar position="sticky" className={cls.top_panel}>
        <Toolbar>
          <Grid
            container
            spacing={0}
            direction="row"
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
            className={cls.header}
          >
            <div className={cls.whitelist}>
              <PanToolIcon style={{ fontSize: 14 }} />
              <FormControl>
                <NativeSelect
                  name="whitelist"
                  inputProps={{ 'aria-label': 'whitelist' }}
                >
                  <option value={10}>Main Whitelist</option>
                  <option value={20}>Show all</option>
                </NativeSelect>
              </FormControl>
              <NavLink to="/wp">What is it?</NavLink>
            </div>

            {state.auth ? (
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
                wrap="nowrap"
                className={cls.address}
              >
                <NavLink to="/wp" className={cls.nick}>
                  {/* <span>@mrboss</span> */}
                  {/* <EditIcon /> */}
                </NavLink>

                <TextField
                  label="Balance (rubys)"
                  variant="filled"
                  value={balance || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="address"
                  variant="filled"
                  value={address || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    toniumNFT.providerLogout();
                    setLogin(dispatch, false);
                  }}
                  className={cls.logout}
                >
                  Log Out
                </Button>
              </Grid>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(dispatch, true)}
              >
                Login
              </Button>
            )}

            <div className={cls.lang}>
              <FormControl>
                <NativeSelect name="lang" inputProps={{ 'aria-label': 'lang' }}>
                  <option value={10}>EN</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
