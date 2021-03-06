import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

import HistoryIcon from '../../img/history.svg';
import Loader from '../../Components/Loader';
import {
  ContextApp,
  setUserAllTokens,
  setUserCollections,
  setCurrentToken,
  // setCurrentSellToken,
} from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';

import cls from './styles.module.scss';

// type TokenItemType = {
//   name: string;
//   address: string;
//   file: string;
//   marked: boolean;
// };

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

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

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

const Own = () => {
  const history = useHistory();
  const { state, dispatch, toniumNFT } = useContext(ContextApp);
  const [value, setValue] = useState(0);
  const [load, setLoad] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // console.log("collections:", state.userCollections)
  // console.log("nfts", state.userAllTokens)

  useEffect(() => {
    if (state.auth) {
      setLoad(true);

      toniumNFT.actions.getUserCollections().then((data: any) => {
        // eslint-disable-next-line no-console

        setUserCollections(dispatch, data);

        const newwlyOne: any = [];
        data.forEach(async (element: any) => {
          await toniumNFT.actions
            .getMintNfts(element.address)
            .then((collection: any) => {
              // eslint-disable-next-line no-console

              collection.map((i: any) => newwlyOne.push(i));
            });
          setUserAllTokens(dispatch, newwlyOne);
          setLoad(false);
        });
      });

      // to do ajax
      // const payload = [
      //   {
      //     name: 'Test1',
      //     address: '0:x12312312432534453',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     marked: true,
      //   },
      //   {
      //     name: 'Test2',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     marked: true,
      //   },
      //   {
      //     name: 'Test3',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     bided: true,
      //   },
      //   {
      //     name: 'Test4',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     my: true,
      //   },
      //   {
      //     name: 'Test5',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     my: true,
      //   },
      //   {
      //     name: 'Test6',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     my: true,
      //   },
      //   {
      //     name: 'Test7',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     my: true,
      //   },
      //   {
      //     name: 'Test8',
      //     address: '0:x12312332425532535',
      //     img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
      //     my: true,
      //   },
      // ];
      // setUserAllTokens(dispatch, payload);
      // setLoad(false);

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

  // const handleSellToken = async (val: any) => {
  //   // await localStorage.setItem('sellToken', JSON.stringify(val));
  //   setCurrentSellToken(dispatch, { token: val });
  // };
  // eslint-disable-next-line no-console
  return (
    <div className={cls.own}>
      <Container className={cls.container}>
        <Breadcrumbs>
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
            <AntTab label="All" {...a11yProps(0)} />
            <AntTab label="Minted" {...a11yProps(1)} />
            <AntTab label="Auction" {...a11yProps(2)} />
          </Tabs>

          <div className={cls.history}>
            <img src={HistoryIcon} className={cls.historyIcon} alt="History" />
            <NavLink to="/own/transaction" className={cls.historyLink}>
              Transaction history
            </NavLink>
          </div>
        </div>

        <TabPanel value={value} index={0}>
          <div className={cls.wrapTokens}>
            {state.userAllTokens.map((item: any) => (
              <div className={cls.tokens}>
                <div
                  className={cls.three}
                  style={{
                    backgroundImage: `url(${
                      item.metadata?.tokenFileAddress?.chunks
                        ? item.metadata.tokenFileAddress.chunks
                        : 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg'
                      // `https://ipfs.io/ipfs/${item.metadata.tokenFileAddress.ipfs}`
                    })`,
                    cursor: 'pointer',
                  }}
                  key={item.addrData}
                  onClick={() => handleTokenClick(item)}
                  onKeyPress={() => {}}
                  role="presentation"
                >
                  {/* <NavLink to="/own/sell" className={cls.btnToken}>
                    <div
                      onClick={() => handleSellToken(item)}
                      onKeyPress={() => {}}
                      role="presentation"
                    >
                      Sell
                    </div>
                  </NavLink>
                  <NavLink to="/token" className={cls.btnToken}>
                    <div
                      onClick={() => handleTokenClick(item)}
                      onKeyPress={() => {}}
                      role="presentation"
                    >
                      Send
                    </div>
                  </NavLink>
                  <NavLink to="#" className={cls.btnToken}>
                    Edit
                  </NavLink> */}
                </div>
                <span className={cls.text}>
                  {item.metadata ? item.metadata.name : ''}
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

export default Own;
