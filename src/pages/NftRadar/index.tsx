import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

import Loader from '../../Components/Loader';
import { ContextApp, setUserAllTokens } from '../../store/reducer';
import Breadcrumbs from '../../Components/Breadcrumbs';

import cls from './styles.module.scss';

type TokenItemType = {
  name: string;
  address: string;
  img: string;
  marked: boolean;
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

const Radar = () => {
  const { state, dispatch } = useContext(ContextApp);
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
          name: 'Test1',
          address: '0:x12312312432534453',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          marked: true,
        },
        {
          name: 'Test2',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          marked: true,
        },
        {
          name: 'Test3',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          bided: true,
        },
        {
          name: 'Test4',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          my: true,
        },
        {
          name: 'Test5',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          my: true,
        },
        {
          name: 'Test6',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          my: true,
        },
        {
          name: 'Test7',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          my: true,
        },
        {
          name: 'Test8',
          address: '0:x12312332425532535',
          // img: 'https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg',
          my: true,
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
    <div className={cls.radar}>
      <Container className={cls.container}>
        <Breadcrumbs>
          <NavLink to="/">Home</NavLink>
        </Breadcrumbs>

        <h1 className={cls.title}>Nft Radar</h1>

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
        </div>

        <TabPanel value={value} index={0}>
          <div className={cls.wrapTokens}>
            {state.userAllTokens.map((item: TokenItemType) => (
              <NavLink to="/radar/token" className={cls.tokens}>
                <div
                  className={cls.three}
                  // style={{ backgroundImage: `url(${item.img})` }}
                />
                <span className={cls.text}>{item.name}</span>
              </NavLink>
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

export default Radar;
