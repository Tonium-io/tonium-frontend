import React, { ReactNode } from 'react';

import Grid from '@material-ui/core/Grid';

import cls from '../../app.module.scss';

import LeftMenu from './components/LeftMenu';
import Header from './components/Header';
import styles from './styles.module.scss';

interface MainProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainProps> = ({ children }) => (
  <Grid
    container
    spacing={0}
    direction="row"
    justify="center"
    alignItems="stretch"
    className={styles.wrap}
  >
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

    <Grid item xs={10}>
      <Header />
      <div className={cls.content}>{children}</div>
    </Grid>
  </Grid>
);

export default MainLayout;
