/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useReducer } from 'react';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
/* eslint-disable react/jsx-props-no-spreading */
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ToniumNFT from './blockchain/ToniumNTF';

import Home from './pages/Home/Home';
import Radar from './pages/Radar/Radar';
import Auction from './pages/Auction/Auction';
import Own from './pages/Own/Own';
import { ContextApp, reducer, intialState } from './store/reducer';
import UserWallet from './Components/UserWallet/UserWallet';

import cls from './app.module.scss';

declare const window: any;

function App() {
  const [signerId, setSignerId] = useState(0);
  const [state, dispatch] = useReducer(reducer, intialState);
  const [open, setOpen] = useState(false);
  const [mnemonic, setMnemonic] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);
  // const toniumNFT = useMemo(() => new ToniumNFT(), []);
  const toniumNFT = new ToniumNFT(
    'benefit clock effort mushroom milk organ glory bacon stomach morning toy excess entry clay kitten damage sphere three base bind envelope thought valve cat',
  );
  window.toniumNFT = toniumNFT;
  const handleClose = () => {
    setMnemonic(false);
    setOpen(false);
  };

  const DialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={cls.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={cls.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  };
  const login = (name: any): any => {
    if (name === 'TonSDK') {
      setMnemonic(true);
    } else {
      toniumNFT.setProvider(name);
      handleClose();
    }
  };
  return (
    <ContextApp.Provider value={{ dispatch, state }}>
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
                  <Grid item xs={8}>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                    >
                      Dashboard
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpen(true)}
                    >
                      Login
                    </Button>
                  </Grid>
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

        <Dialog
          onClose={() => handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <Grid item xs={12} className={cls.poapup}>
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
              className={cls.poapup__title}
            />
            <DialogContent className={cls.poapup__content}>
              {Object.entries(toniumNFT.getProviders()).map((provider) => (
                <div key={provider[0]}>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={!provider[1].isAvailable()}
                    onClick={() => login(provider[0])}
                  >
                    {provider[0]}
                  </Button>
                </div>
              ))}
            </DialogContent>

            {mnemonic && (
              <form
                autoComplete="off"
                className={cls.mnemonic}
                onSubmit={(data) => console.log(data)}
              >
                <Grid item xs={8} spacing={3}>
                  {toniumNFT
                    .getProviders()
                    .TonSDK.getRequiredInitFields()
                    .map((field: any) => (
                      <TextField
                        error={Boolean(field.validate)}
                        id={field.name}
                        label={field.description}
                        fullWidth
                        value={formValues?.[`${field.name}`]}
                      />
                    ))}
                </Grid>
                <Grid item xs={4} spacing={3}>
                  {toniumNFT
                    .getProviders()
                    .TonSDK.getInitActions()
                    .map((action: any) => (
                      <Button
                        variant="outlined"
                        color="primary"
                        id={action.name}
                        style={{ height: '100%', marginLeft: 20 }}
                        onClick={() => {
                          const nameValue = {};
                          action.action().then((data: any) => {
                            nameValue[`${action.name}`] = data;
                            setFormValues(nameValue);
                            console.log(formValues);
                          });
                        }}
                      >
                        {action.description}
                      </Button>
                    ))}
                </Grid>
              </form>
            )}
          </Grid>
        </Dialog>
      </Router>
    </ContextApp.Provider>
  );
}

export default App;
