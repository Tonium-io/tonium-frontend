import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import { Link, NavLink } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import Logo from '../../../../img/tonium-logo-dark-text.svg';
import cls from '../../../../app.module.scss';

const LeftMenu: React.FC = () => (
  <>
    <ListItem
      button
      className={cls.panel_logo}
      component={NavLink}
      to="/home"
      // activeClassName={cls.activeLink}
    >
      <img src={Logo} alt="logo" />
    </ListItem>
    <ListItem
      button
      className={[cls.panel_button, cls.small_button].join(' ')}
      component={NavLink}
      to="/own"
      activeClassName={cls.activeLink}
    >
      <ListItemText primary="My own" />
    </ListItem>
    <ListItem
      button
      className={[cls.panel_button, cls.small_button].join(' ')}
      component={NavLink}
      to="/collections"
      activeClassName={cls.activeLink}
    >
      <ListItemText primary="Mint NFT" />
    </ListItem>
    <ListItem
      button
      className={cls.panel_button}
      component={NavLink}
      to="/auction"
      activeClassName={cls.activeLink}
    >
      <ListItemText primary="Auction" />
    </ListItem>
    <ListItem
      button
      className={cls.panel_button}
      component={NavLink}
      to="/radar"
      activeClassName={cls.activeLink}
    >
      <ListItemText primary="NFT radar" />
    </ListItem>

    <div className={cls.footer}>
      <Typography className={cls.socials}>
        <Link
          to={{ pathname: 'https://twitter.com/TONiumNFT' }}
          target="_blank"
        >
          <TwitterIcon />
        </Link>
        <Link to={{ pathname: 'https://t.me/tonium_io' }} target="_blank">
          <TelegramIcon />
        </Link>
      </Typography>
      <Typography>
        TONIUM <span>ver 0.5 MVP</span>
      </Typography>
      <Typography>
        <Link
          to={{
            pathname:
              'https://drive.google.com/file/d/10ygf_qk5qpa5mJ9VKLdFyuo5X3Me-2iF/',
          }}
          target="_blank"
        >
          WhitePaper
        </Link>
      </Typography>
    </div>
  </>
);

export default LeftMenu;
