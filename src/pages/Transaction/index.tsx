import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import Loader from '../../Components/Loader';
import BackIcon from '../../img/back.svg';
import AddIcon from '../../img/add.svg';
import ArrowIcon from '../../img/arrow.svg';
import HammerIcon from '../../img/hammer.svg';
import { ContextApp, setUserAllTokens } from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';
import getShortToken from '../../utils/getShortToken';

import cls from './styles.module.scss';

type TokenItemType = {
  name: string;
  address: string;
  action: string;
  minted: string;
  transfer: string;
};

interface StyledTabProps {
  label: string;
}

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div className={cls.tab}>{children}</div>}
    </div>
  );
};

// eslint-disable-next-line arrow-body-style
const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const AntTab = withStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        margin: '19px 20px 0 0',
        textTransform: 'uppercase',
        color: '#A9A9A9',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '19px',
        textDecoration: 'none',
        minWidth: 0,
        minHeight: 0,
        padding: 0,
        opacity: 1,
        '&$selected': {
          color: '#000',
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      selected: {},
    }),
  // eslint-disable-next-line react/jsx-props-no-spreading
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const Transaction = () => {
  const { state, dispatch } = useContext(ContextApp);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);
  const [load, setLoad] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        {
          name: 'sexy beast#1',
          address:
            '0:2eddab8c2a6b560d100ab6e04ef3f973d9bcb2e4e22d3bff6cdf4f5a4e827a20',
          minted: 'minted',
          action: 'bid win',
          transfer: 'transfer',
        },
        {
          name: 'sexy beast#1',
          address:
            '0:2eddab8c2a6b560d100ab6e04ef3f973d9bcb2e4e22d3bff6cdf4f5a4e827a20',
          minted: 'minted',
          action: 'bid win',
          transfer: 'transfer',
        },
      ];
      setUserAllTokens(dispatch, payload);
      setLoad(false);
      toast.success('Success', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }
  }, []);

  if (load) {
    return <Loader />;
  }
  // eslint-disable-next-line no-console
  return (
    <div className={cls.transaction}>
      <Container className={cls.container}>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="/">Home</NavLink>
        </Breadcrumbs>

        <span className={cls.userName}>
          @lordofnft
          <span className={cls.tokenSpan}>tokens</span>
        </span>

        <div className={cls.navWrap}>
          <Tabs
            TabIndicatorProps={{
              style: {
                height: '6px',
                background: ' #FF00E0',
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AntTab label="All" {...a11yProps(0)} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AntTab label="Minted" {...a11yProps(1)} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AntTab label="Auction" {...a11yProps(2)} />
          </Tabs>

          <div className={cls.back}>
            <img src={BackIcon} alt="Back" />
            <NavLink to="/own" className={cls.backLink}>
              Back
            </NavLink>
          </div>
        </div>

        <TabPanel value={value} index={0}>
          <div className={cls.wrapTokens}>
            {state.userAllTokens.map((item: TokenItemType) => (
              <div className={cls.wrapHistory}>
                <span className={cls.wrapSpan}>
                  <span>
                    <img src={AddIcon} alt="add" />
                    <span className={cls.action}>{item.minted}</span>
                    <span className={cls.tokenName}>{item.name}</span>
                    <span className={cls.where}>by</span>
                    <span className={cls.userAdres}>
                      {getShortToken(item.address)}
                    </span>
                  </span>
                  <span className={cls.date}>17:01 14.05.2021</span>
                </span>

                <span className={cls.wrapSpan}>
                  <span>
                    <img src={ArrowIcon} alt="add" />
                    <span className={cls.action}>{item.action}</span>
                    <span className={cls.tokenName}>{item.name}</span>
                    <span className={cls.where}>by</span>
                    <span className={cls.userAdres}>
                      {getShortToken(item.address)}
                    </span>
                  </span>
                  <span className={cls.date}>17:01 14.05.2021</span>
                </span>

                <span className={cls.wrapSpan}>
                  <span>
                    <img src={HammerIcon} alt="add" />
                    <span className={cls.action}>{item.transfer}</span>
                    <span className={cls.tokenName}>{item.name}</span>
                    <span className={cls.where}>from</span>
                    <span className={cls.userAdres}>
                      {getShortToken(item.address)}
                    </span>
                    <span className={cls.where}>to</span>
                    <span className={cls.userAdres}>
                      {getShortToken(item.address)}
                    </span>
                  </span>
                  <span className={cls.date}>17:01 14.05.2021</span>
                </span>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h2>Minted</h2>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <h2>Auction</h2>
        </TabPanel>
      </Container>
    </div>
  );
};

export default Transaction;
