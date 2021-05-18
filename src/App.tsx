/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PolymerIcon from '@material-ui/icons/Polymer';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ToniumNFT from './blockchain/ToniumNTF';

import Home from './pages/Home/Home';
import Radar from './pages/Radar/Radar';
import Auction from './pages/Auction/Auction';
import Own from './pages/Own/Own';

import UserWallet from './Components/UserWallet/UserWallet';

import cls from './app.module.scss';

declare const window: any;

function App() {
  const [signerId, setSignerId] = useState(0);

  const toniumNFT = useMemo(() => new ToniumNFT(), []);

  window.toniumNFT = toniumNFT;

  return (
    <Router>
      <div className={cls.app}>
        <CssBaseline />
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/own">
              <ListItemIcon>
                <PolymerIcon />
              </ListItemIcon>
              <ListItemText primary="My own" />
            </ListItem>
            <ListItem button component={Link} to="/auction">
              <ListItemIcon>
                <PolymerIcon />
              </ListItemIcon>
              <ListItemText primary="Auction" />
            </ListItem>
            <ListItem button component={Link} to="/radar">
              <ListItemIcon>
                <PolymerIcon />
              </ListItemIcon>
              <ListItemText primary="NFT radar" />
            </ListItem>
          </Grid>
          <Grid item xs={10}>
            <AppBar position="sticky">
              <Toolbar>
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  Dashboard
                </Typography>
                <UserWallet />
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/own">
                <Own />
              </Route>
              <Route path="/auction">
                <Auction />
              </Route>
              <Route path="/radar">
                <Radar />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
