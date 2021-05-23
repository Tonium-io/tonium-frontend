/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import GavelIcon from '@material-ui/icons/Gavel';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import PanToolIcon from '@material-ui/icons/PanTool';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react/jsx-props-no-spreading */
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { ToastContainer } from 'react-toastify';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ToniumNFT from './blockchain/ToniumNTF';

import Home from './pages/Home/Home';
import Mint from './pages/Mint/Mint';
import Login from './Components/Login';
import Radar from './pages/Radar/Radar';
import Auction from './pages/Auction/Auction';
import Own from './pages/Own/Own';
import Wp from './pages/Wp/Wp';
import {
  ContextApp,
  reducer,
  intialState,
  setOpen,
  setLogin,
} from './store/reducer';
import cls from './app.module.scss';

import Logo from './img/tonium-logo-dark-text.svg';

// Application initialization

declare const window: any;

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [address, setAddress] = useState('');
  const toniumNFT = useMemo(() => new ToniumNFT(state, dispatch), []);
  window.toniumNFT = toniumNFT;
  useEffect(() => {
    if (state.auth) {
      // console.log(state.auth);
      // toniumNFT
      //   .getCurrentProvider()
      //   .getAddress()
      //   .then((data: any) => {
      //     console.log(data);
      //   });
    }
  }, [state.auth]);

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      <Router>
        <div className={cls.app}>
          <CssBaseline />
          <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="stretch"
            className={cls.wrap}
          >
            <Grid
              container
              xs={2}
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              wrap="nowrap"
              className={cls.left_panel}
            >
              <ListItem
                button
                className={cls.panel_logo}
                component={Link}
                to="/home"
              >
                <img src={Logo} alt="logo" width="140" />
              </ListItem>
              <ListItem
                button
                className={[cls.panel_button, cls.small_button].join(' ')}
                component={Link}
                to="/own"
              >
                <ListItemIcon className={cls.icon}>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="My own" />
              </ListItem>
              <ListItem
                button
                className={[cls.panel_button, cls.small_button].join(' ')}
                component={Link}
                to="/mint"
              >
                <ListItemIcon className={cls.icon}>
                  <GpsFixedIcon />
                </ListItemIcon>
                <ListItemText primary="Mint NFT" />
              </ListItem>
              <ListItem
                button
                className={cls.panel_button}
                component={Link}
                to="/auction"
              >
                <ListItemIcon className={cls.icon}>
                  <GavelIcon />
                </ListItemIcon>
                <ListItemText primary="Auction" />
              </ListItem>
              <ListItem
                button
                className={cls.panel_button}
                component={Link}
                to="/radar"
              >
                <ListItemIcon className={cls.icon}>
                  <TrackChangesIcon />
                </ListItemIcon>
                <ListItemText primary="NFT radar" />
              </ListItem>

              <div className={cls.footer}>
                <Typography className={cls.socials}>
                  <Link
                    to={{ pathname: 'https://twitter.com' }}
                    target="_blank"
                  >
                    <TwitterIcon />
                  </Link>
                  <Link
                    to={{ pathname: 'https://t.me/tonium_io' }}
                    target="_blank"
                  >
                    <TelegramIcon />
                  </Link>
                </Typography>
                <Typography>
                  TONIUM <span>ver 0.MVP</span>
                </Typography>
                <Typography>
                  <Link to="/wp">Whitepapper</Link>
                </Typography>
              </div>
            </Grid>

            <Grid item xs={10}>
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
                      <Link to="/wp">What is it?</Link>
                    </div>

                    {state.auth ? (
                      <Grid
                        container
                        spacing={0}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        wrap="nowrap"
                        className={cls.address}
                      >
                        <Link to="/wp" className={cls.nick}>
                          {/* <span>@mrboss</span> */}
                          {/* <EditIcon /> */}
                        </Link>
                        <form
                          noValidate
                          autoComplete="off"
                          style={{ display: 'flex' }}
                        >
                          <TextField
                            label="address"
                            variant="filled"
                            value={address || ''}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </form>
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
                        {/* <span className={cls.balance}>
                          <span>12.23</span>
                          <img src={CristalIcon} alt="TON" width="20" />{' '}
                        </span> */}
                        {/* <Link to="/wp" className={cls.linkwallet}>
                          <LinkIcon style={{ fontSize: 30 }} />
                        </Link> */}
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
                        <NativeSelect
                          name="lang"
                          inputProps={{ 'aria-label': 'lang' }}
                        >
                          <option value={10}>EN</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </Grid>
                </Toolbar>
              </AppBar>

              <div className={cls.content}>
                <Switch>
                  <Route path="/own">
                    <Own />
                  </Route>
                  <Route path="/mint">
                    <Mint />
                  </Route>
                  <Route path="/auction">
                    <Auction />
                  </Route>
                  <Route path="/radar">
                    <Radar />
                  </Route>
                  <Route path="/wp">
                    <Wp />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          xs={12}
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Login toniumNFT={toniumNFT} />
        </Grid>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </ContextApp.Provider>
  );
}

export default App;
