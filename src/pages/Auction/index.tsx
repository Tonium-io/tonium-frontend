import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { NavLink } from 'react-router-dom';
// import { toast } from 'react-toastify';
import CristallIcon from '../../img/cristall.svg';
import TimeIcon from '../../img/time.svg';
import Loader from '../../Components/Loader';
import {
  ContextApp,
  setNftAuctions,
  setCurrentToken,
} from '../../store/reducer';

import cls from './styles.module.scss';

type TokenItemType = {
  name: string;
  address: string;
  img: string;
  minted: boolean;
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

const AntTab = withStyles((theme: Theme) =>
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
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const Auction = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(ContextApp);
  const [value, setValue] = useState(0);
  const [load, setLoad] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue); // eslint-disable-next-line no-unused-vars
  };

  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        {
          name: 'Test1',
          address: '0:x12312312432534453',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          minted: true,
          metadata: {
            name: 'IPFS',
            tokenFileAddress: {
              ipfs: 'hi',
            },
          },
          addrData:
            '0:044f7425d70eb6235c38b39e35df2a03768950c1ee9bb54aeca5af407e0ccaee',
          addrOwner:
            '0:e2dfc131f72f5a09b1bb864c906c217b0cb464dd83fb878862d887476ed11fd2',
        },
        {
          name: 'Test2',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          minted: true,
          metadata: {
            name: 'IPFS',
            tokenFileAddress: {
              ipfs: 'hi',
            },
          },
          addrData:
            '0:044f7425d70eb6235c38b39e35df2a03768950c1ee9bb54aeca5af407e0ccaee',
          addrOwner:
            '0:e2dfc131f72f5a09b1bb864c906c217b0cb464dd83fb878862d887476ed11fd2',
        },
        {
          name: 'Test3',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          auctions: true,
          metadata: {
            name: 'IPFS',
            tokenFileAddress: {
              ipfs: 'hi',
            },
          },
          addrData:
            '0:044f7425d70eb6235c38b39e35df2a03768950c1ee9bb54aeca5af407e0ccaee',
          addrOwner:
            '0:e2dfc131f72f5a09b1bb864c906c217b0cb464dd83fb878862d887476ed11fd2',
        },
        {
          name: 'Test4',
          address: '0:x12312332425532535',
          img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          auctions: true,
          metadata: {
            name: 'IPFS',
            tokenFileAddress: {
              ipfs: 'hi',
            },
          },
          addrData:
            '0:044f7425d70eb6235c38b39e35df2a03768950c1ee9bb54aeca5af407e0ccaee',
          addrOwner:
            '0:e2dfc131f72f5a09b1bb864c906c217b0cb464dd83fb878862d887476ed11fd2',
        },
      ];
      setNftAuctions(dispatch, payload);
      setLoad(false);
      // toast.success('Success', {
      //   position: 'bottom-right',
      //   autoClose: 4000,
      // });
    }
  }, []);
  if (load) {
    return <Loader />;
  }

  const handleTokenClick = (val: any) => {
    setCurrentToken(dispatch, { token: val });
    history.push('/token');
  };

  return (
    <div className={cls.auction}>
      <Container className={cls.container}>
        <h1 className={cls.title}>NFT auction</h1>

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
            <AntTab label="Bided" {...a11yProps(1)} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AntTab label="marked" {...a11yProps(2)} />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AntTab label="My" {...a11yProps(3)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <div className={cls.wrapTokens}>
            {state.nftAuctions.map((item: TokenItemType) => (
              <div className={cls.tokens}>
                <div
                  className={cls.three}
                  style={{ backgroundImage: `url(${item.img})` }}
                  onClick={() => handleTokenClick(item)}
                  onKeyPress={() => {}}
                  role="presentation"
                />

                <span className={cls.text}>{item.name}</span>

                <div className={cls.wrapDescription}>
                  <span className={cls.time}>
                    <img src={TimeIcon} alt="Time" />
                    232:21
                  </span>

                  <span className={cls.description}>
                    8
                    <img src={CristallIcon} alt="Cristall" />
                    <span>last bid</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h2>Bided</h2>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <h2>marked</h2>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <h2>My</h2>
        </TabPanel>
      </Container>
    </div>
  );
};

export default Auction;
