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
import StarIcon from '@material-ui/icons/Star';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import GavelIcon from '@material-ui/icons/Gavel';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import PanToolIcon from '@material-ui/icons/PanTool';
import CloseIcon from '@material-ui/icons/Close';
/* eslint-disable react/jsx-props-no-spreading */
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';
import LinkIcon from '@material-ui/icons/Link';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ToniumNFT from './blockchain/ToniumNTF';

import Home from './pages/Home/Home';
import Mint from './pages/Mint/Mint';
import Radar from './pages/Radar/Radar';
import Auction from './pages/Auction/Auction';
import Own from './pages/Own/Own';
import Wp from './pages/Wp/Wp';
import { ContextApp, reducer, intialState } from './store/reducer';
import cls from './app.module.scss';

import Logo from './img/tonium-logo-dark-text.svg';
import CristalIcon from './img/cristall.svg';

// Application initialization

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
                        <span>@mrboss</span>
                        <EditIcon />
                      </Link>
                      <form noValidate autoComplete="off">
                        <TextField label="address" variant="filled" />
                      </form>
                      <span className={cls.balance}>
                        <span>12.23</span>
                        <img src={CristalIcon} alt="TON" width="20" />{' '}
                      </span>
                      <Link to="/wp" className={cls.linkwallet}>
                        <LinkIcon style={{ fontSize: 30 }} />
                      </Link>
                    </Grid>

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
