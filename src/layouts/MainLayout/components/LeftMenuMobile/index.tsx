import React /* useContext, useRef, useEffect */ from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Link, NavLink } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import UseDetectClickOut from '../../../../hook/useDetectClickOut';

// import cls from '../../../../app.module.scss';
import cls from './styles.module.scss';
// import { ContextApp, setOpenLeftMenu } from '../../../../store/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      marginBottom: '10px',
      borderRadius: '5px 5px 0px 0px',
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

const LeftMenu: React.FC = () => {
  const classes = useStyles();
  const { nodeRef } = UseDetectClickOut();

  return (
    <Grid
      container
      item
      xs={11}
      direction="column"
      wrap="nowrap"
      className={cls.top}
      ref={nodeRef}
    >
      <Paper component="form" className={classes.root}>
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

      <ListItem
        button
        className={`${cls.panelButton} ${classes.styleBtn}`}
        component={NavLink}
        to="/own"
        // activeClassName={cls.activeLink}
      >
        <ListItemText primary="My NFT" />
      </ListItem>
      <ListItem
        button
        className={`${cls.panelButton} ${classes.styleBtn}`}
        component={NavLink}
        to="/collections"
        // activeClassName={cls.activeLink}
      >
        <ListItemText primary="Mint NFT" />
      </ListItem>
      <ListItem
        button
        className={`${cls.panelButton} ${classes.styleBtn}`}
        component={NavLink}
        to="/auction"
        // activeClassName={cls.activeLink}
      >
        <ListItemText primary="Auction" />
      </ListItem>
      <ListItem
        button
        className={`${cls.panelButton} ${classes.styleBtn}`}
        component={NavLink}
        to="/radar"
        // activeClassName={cls.activeLink}
      >
        <ListItemText primary="NFT radar" />
      </ListItem>

      <div className={cls.footer}>
        <Typography className={cls.socials}>
          <Link
            to={{ pathname: 'https://twitter.com/TONiumNFT' }}
            target="_blank"
          >
            <TwitterIcon className={cls.socialIcon} />
          </Link>
          <Link to={{ pathname: 'https://t.me/tonium_io' }} target="_blank">
            <TelegramIcon className={cls.socialIcon} />
          </Link>
        </Typography>
        <Typography>
          TONIUM <span>ver 0.5</span>
        </Typography>
        <Typography className={cls.info}>
          <Link
            className={cls.info}
            to={{
              pathname:
                'https://drive.google.com/file/d/10ygf_qk5qpa5mJ9VKLdFyuo5X3Me-2iF/',
            }}
            target="_blank"
          >
            WhitePaper
          </Link>
        </Typography>
        <PowerInputIcon className={cls.inputIcon} />
      </div>
    </Grid>
  );
};

export default LeftMenu;
