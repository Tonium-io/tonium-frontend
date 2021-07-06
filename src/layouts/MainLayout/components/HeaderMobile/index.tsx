import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
import CristallIcon from '../../../../img/cristall.svg';
import Logo from '../../../../img/tonium-logo-mobile.svg';
import getShortToken from '../../../../utils/getShortToken';

import {
  ContextApp,
  setOpenLeftMenu /* setLogin, setOpen */,
} from '../../../../store/reducer';
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
        paddingTop: '3px',
      },
      '& :before': {
        content: 'none',
      },
      '& :after': {
        content: 'none',
      },
      '& .MuiFilledInput-root': {
        backgroundColor: 'transparent',
      },
    },
    menu: {
      '& .MuiNativeSelect-root': {
        fontSize: '12px',
        lineHeight: '14px',
        textTransform: 'uppercase',
        color: '#000000',
        paddingLeft: '10px',
      },
      '& :before': {
        content: 'none',
      },
      '& :after': {
        content: 'none',
      },
    },
    switch: {
      '& .MuiFormControlLabel-root': {
        marginRight: '0',
      },
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
      menu?.classList.add(`${styles.menuActive}`);
    } else {
      menu?.classList.remove(`${styles.menuActive}`);
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
  }, [state.auth]);

  return (
    <>
      {load && <Loader global />}

      <AppBar className={styles.headerWrap}>
        <Toolbar className={styles.header}>
          <div className={styles.leftMenu}>
            <div className={styles.burgerWrap}>
              <Button className={styles.burgerBtn} onClick={handleClick}>
                <span className={styles.menuIcon} />
              </Button>
            </div>
            <img src={Logo} alt="Logo" />
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
            <img src={CristallIcon} alt="Cristall" />
            <div className={styles.unlinkWrap}>
              <LinkIcon />
              <span className={styles.unlink}>unlink</span>
            </div>

            <div className={styles.settingsWrap}>
              <Button onClick={settingsClick}>
                <SettingsIcon color="inherit" className={styles.settings} />
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
                  <PersonIcon className={styles.menuItemIcon} color="inherit" />
                  <span className={styles.userName}>@lordofnft</span>
                  <PensilIcon className={styles.iconAfter} color="inherit" />
                </div>

                <div className={styles.menuItem}>
                  <WalletIcon className={styles.menuItemIcon} color="inherit" />
                  <span className={styles.menuItemText}>Wallet</span>
                  <DownIcon className={styles.iconAfter} />
                </div>

                <div className={styles.menuItem}>
                  <PanToolIcon
                    className={styles.menuItemIcon}
                    color="inherit"
                  />

                  <Grid item>
                    <NativeSelect
                      className={`${classes.menu} ${styles.menuItemText}`}
                      IconComponent={DownIcon}
                      name="whitelist"
                      inputProps={{ 'aria-label': 'whitelist' }}
                    >
                      <option value={10}>Main Whitelist</option>
                      <option value={20}>Show all</option>
                    </NativeSelect>
                  </Grid>
                </div>
                <div className={styles.menuItem}>
                  <LanguageIcon
                    className={styles.menuItemIcon}
                    color="inherit"
                  />

                  <Grid container item justify="center">
                    <NativeSelect
                      className={`${classes.menu} ${styles.menuItemText}`}
                      name="lang"
                      IconComponent={DownIcon}
                      inputProps={{ 'aria-label': 'lang' }}
                    >
                      <option value={10}>EN</option>
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
