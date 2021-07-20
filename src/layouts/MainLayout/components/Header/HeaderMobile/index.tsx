import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import PanToolIcon from '@material-ui/icons/PanTool';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputBase from '@material-ui/core/InputBase';
import PensilIcon from '@material-ui/icons/BorderColorOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import LanguageIcon from '@material-ui/icons/Language';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DownIcon from '@material-ui/icons/ExpandMore';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import CristallIcon from '../../../../../img/cristall.svg';
import Logo from '../../../../../img/tonium-logo-mobile.svg';
import getShortToken from '../../../../../utils/getShortToken';

import {
  ContextApp,
  setOpenLeftMenu,
  setLogin,
  setOpen,
} from '../../../../../store/reducer';
import Loader from '../../../../../Components/Loader';

import styles from '../styles.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputBase-input': {
        margin: theme.typography,
        fontSize: '12px',
        lineHeight: '14px',
        color: '#ABABAB',
        width: '78px',
        paddingTop: '3px',
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
        marginRight: '0',
      },
    },
    rootBtn: {
      minWidth: '0',
      width: '37px',
      height: '40px',
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
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...states, [event.target.name]: event.target.checked });
  };

  const handleClick = () => {
    const menu = document.querySelector(`.${styles.menuIcon}`);
    const menuActive = document.querySelector(
      `.${styles.menuIcon}.${styles.menuActive}`,
    );

    setOpenLeftMenu(dispatch, !state.openLeftMenu);

    if (menu !== menuActive) {
      setShowModal(false);
    }
  };

  const settingsClick = () => {
    const settings = document.querySelector(`.${styles.settings}`);
    const settingsActive = document.querySelector(
      `.${styles.settings}.${styles.settingsActive}`,
    );

    setShowModal(!isShowModal);

    if (settings !== settingsActive) {
      settings?.classList.add(`${styles.settingsActive}`);
      setOpenLeftMenu(dispatch, false);
    } else {
      settings?.classList.remove(`${styles.settingsActive}`);
    }
  };

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

    history.listen(() => {
      setOpenLeftMenu(dispatch, false);
    });
  }, [state.auth, history]);

  return (
    <>
      {load && <Loader global />}

      <AppBar className={styles.headerWrap}>
        <Toolbar className={styles.header}>
          <div className={styles.leftMenu}>
            <div className={styles.burgerWrap}>
              <Button className={styles.burgerBtn} onClick={handleClick}>
                <span
                  className={`${styles.menuIcon} ${
                    state.openLeftMenu ? styles.menuActive : ''
                  }`}
                />
              </Button>
            </div>
            <NavLink to="/">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>

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
              <Button className={classes.rootBtn} onClick={settingsClick}>
                <SettingsIcon fontSize="small" className={styles.settings} />
              </Button>
            </div>
          </div>

          {isShowModal && (
            <div className={styles.settingsMenu}>
              <div className={styles.settingsMenuHeader}>
                <Grid item>
                  <TextField
                    className={`${classes.root} ${styles.wallet}`}
                    variant="filled"
                    value={getShortToken(address || '')}
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                    }}
                  />
                </Grid>

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
