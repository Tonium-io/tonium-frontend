import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LinkIcon from '@material-ui/icons/Link';
import PanToolIcon from '@material-ui/icons/PanTool';
import PersonIcon from '@material-ui/icons/Person';
import PensilIcon from '@material-ui/icons/BorderColorOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import LanguageIcon from '@material-ui/icons/Language';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DownIcon from '@material-ui/icons/ExpandMore';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import CristallIcon from '../../../../img/cristall.svg';
import getShortToken from '../../../../utils/getShortToken';

import { ContextApp, setLogin, setOpen } from '../../../../store/reducer';
import Loader from '../../../../Components/Loader';

import styles from './styles.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputBase-input': {
        margin: theme.typography,
        fontSize: '12px',
        lineHeight: '14px',
        color: '#ABABAB',
        width: '78px',
        paddingTop: '0',
        marginRight: '20px',
      },
      '& .MuiFilledInput-root': {
        backgroundColor: 'transparent',
      },
    },
    menu: {
      '& .MuiInputBase-input': {
        fontSize: '12px',
        lineHeight: '14px',
        textTransform: 'uppercase',
        color: '#000000',
      },
      '& .MuiNativeSelect-icon': {
        right: 'calc(100% - 110px)',
        color: '#33A9FB',
      },
      '& .MuiNativeSelect-select:focus': {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    },
    switch: {
      '& .MuiFormControlLabel-root': {
        marginRight: 0,
        marginLeft: 0,
        width: 90,
      },
    },
    rootBtn: {
      minWidth: '0',
      width: '37px',
      height: '40px',
    },
    rootPaper: {
      padding: '2px 4px 2px 8px',
      display: 'flex',
      alignItems: 'center',
      width: '500px',
      background: 'rgba(189, 189, 189, 0.1)',
      borderRadius: '5px 5px 0px 0px',
      marginTop: '4px',
      marginBottom: '6px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 0,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    styleBtn: {
      background: '#313131',
      width: '90%',
      color: '#fff',
      padding: '31px 0',
      borderBottom: '2px solid #fff',
      textAlign: 'center',
    },
  }),
);

const Header: React.FC = () => {
  const { state, dispatch, toniumNFT } = useContext(ContextApp);
  const [isShowModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<Number>();
  const [load, setLoad] = useState(false);
  const [states, setState] = React.useState({
    checkedB: true,
  });
  const classes = useStyles(0);
  const node = useRef<any>(null);
  const trigger = useRef<any>(null);
  const [show, setShow] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...states, [event.target.name]: event.target.checked });
  };

  const settingsClick = () => {
    const settings = document.querySelector(`.${styles.settings}`);
    const settingsActive = document.querySelector(
      `.${styles.settings}.${styles.settingsActive}`,
    );

    setShowModal(!isShowModal);

    if (settings !== settingsActive) {
      settings?.classList.add(`${styles.settingsActive}`);
    } else {
      settings?.classList.remove(`${styles.settingsActive}`);
    }
  };

  const handleClickOutside = (e: any) => {
    if (trigger.current?.contains(e.target)) {
      return setShow(!show);
    }

    if (!node.current?.contains(e.target)) {
      return setShowModal(false);
    }
    return {
      trigger,
      node,
    };
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

      <AppBar className={styles.headerWrap}>
        <Toolbar className={styles.header}>
          <Paper component="form" className={classes.rootPaper}>
            <InputBase
              className={classes.input}
              placeholder="find address or nft"
              inputProps={{ 'aria-label': 'find address or nft' }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} />
          </Paper>

          <div className={styles.rightMenu}>
            <Grid item>
              <InputBase
                className={styles.balance}
                // variant="filled"
                value={balance || '0'}
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>

            <img
              src={CristallIcon}
              className={styles.cristallIcon}
              alt="Cristall"
            />

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
                  <Button
                    className={styles.unlinkWrap}
                    onClick={() => {
                      toniumNFT.providerLogout();
                      setLogin(dispatch, false);
                    }}
                  >
                    <span className={styles.unlink}>
                      <LinkIcon />
                      Unlink
                    </span>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  className={styles.unlinkWrap}
                  onClick={() => setOpen(dispatch, true)}
                >
                  <span className={styles.unlink}>
                    <LinkIcon />
                    Link
                  </span>
                </Button>
              </Grid>
            )}

            <div className={styles.settingsWrap}>
              <Button
                className={classes.rootBtn}
                onClick={settingsClick}
                ref={trigger}
              >
                <SettingsIcon fontSize="small" className={styles.settings} />
              </Button>
            </div>
          </div>

          {isShowModal && (
            <div className={styles.settingsMenu} ref={node}>
              <div className={styles.settingsMenuHeader}>
                <TextField
                  className={`${classes.root} ${styles.wallet}`}
                  variant="filled"
                  value={getShortToken(address || '')}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                />

                <Grid className={classes.switch} item>
                  <FormControlLabel
                    className={styles.switchWrap}
                    label="Main net"
                    control={
                      <Switch
                        checked={states.checkedB}
                        onChange={handleChange}
                        size="small"
                        name="checkedB"
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                  />
                </Grid>
              </div>

              <div className={styles.menuItems}>
                <div className={styles.menuItem}>
                  <div className={styles.menuItemWrap}>
                    <PersonIcon
                      className={styles.menuItemIcon}
                      fontSize="small"
                    />
                    <span className={styles.userName}>@lordofnft</span>
                  </div>
                  <PensilIcon className={styles.iconAfter} fontSize="small" />
                </div>

                <div className={styles.menuItem}>
                  <div className={styles.menuItemWrap}>
                    <WalletIcon
                      className={styles.menuItemIcon}
                      fontSize="small"
                    />
                    <span className={styles.menuItemText}>Wallet</span>
                  </div>
                  <DownIcon className={styles.iconAfter} />
                </div>

                <div className={styles.menuItem}>
                  <PanToolIcon
                    className={styles.menuItemIcon}
                    fontSize="small"
                  />

                  <Grid item>
                    <NativeSelect
                      className={`${classes.menu} ${styles.menuItemText}`}
                      IconComponent={DownIcon}
                      name="whitelist"
                      inputProps={{
                        'aria-label': 'whitelist',
                      }}
                      disableUnderline
                    >
                      <option value={10}>No filter</option>
                      <option value={20}>Main Whitelist</option>
                      <option value={30}>Show all</option>
                    </NativeSelect>
                  </Grid>
                </div>

                <div className={styles.menuItem}>
                  <LanguageIcon
                    className={styles.menuItemIcon}
                    fontSize="small"
                  />

                  <Grid container item>
                    <NativeSelect
                      className={`${classes.menu} ${styles.menuItemText}`}
                      name="lang"
                      IconComponent={DownIcon}
                      inputProps={{ 'aria-label': 'lang' }}
                      disableUnderline
                    >
                      <option value={10}>English</option>
                    </NativeSelect>
                  </Grid>
                </div>
                <div className={styles.pointInputWrap}>
                  <PowerInputIcon className={styles.powerInput} />
                </div>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
