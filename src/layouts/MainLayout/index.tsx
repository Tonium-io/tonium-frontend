import React, { ReactNode, /* useEffect, useState, */ useContext } from 'react';

import Grid from '@material-ui/core/Grid';

import LeftMenuMobile from './components/LeftMenuMobile';
import LeftMenu from './components/LeftMenu';
import HeaderMobile from './components/HeaderMobile';
import Header from './components/Header';
import { ContextApp } from '../../store/reducer';
import UseWindowSize from '../../hook/useWindowSize';
import cls from '../../app.module.scss';
import styles from './styles.module.scss';

interface MainProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainProps> = ({ children }) => {
  const { state } = useContext(ContextApp);
  const [height, width] = UseWindowSize();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        alignItems="stretch"
        className={styles.wrap}
      >
        {width <= 768 && state.openLeftMenu && <LeftMenuMobile />}

        {height && width > 768 && (
          <Grid
            container
            item
            xs={2}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
            className={styles.left}
          >
            <LeftMenu />
          </Grid>
        )}

        {width > 768 ? (
          <Grid item xs={10}>
            {width <= 768 ? (
              <Grid
                container
                item
                xs={12}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <HeaderMobile />
              </Grid>
            ) : (
              <Header />
            )}
            <div className={cls.content}>{children}</div>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Grid
              container
              item
              xs={12}
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <HeaderMobile />
              <div className={cls.content}>{children}</div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MainLayout;
