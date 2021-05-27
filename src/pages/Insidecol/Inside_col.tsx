import React from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
// import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

import AddBoxIcon from '@material-ui/icons/AddBox';

import cls from '../../app.module.scss';

const InsideCol = () => {
  // todo home page
  // eslint-disable-next-line no-console
  console.log('InsideCol');
  return (
    <div className={cls.mint}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link href="/home">Home</Link>
        <Link href="/mint">NFT Collections</Link>
        <Typography color="textPrimary">Collection #1</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography
          variant="h1"
          component="h1"
          className={cls.h1_image}
          gutterBottom
        >
          <span className={cls.left}>
            <Paper>
              <img
                style={{ width: 70, height: 40 }}
                alt="alt"
                src="https://blog.allo.ua/wp-content/uploads/Glavnaya-kartinka-15.jpg"
              />
            </Paper>
          </span>
          <span className={cls.right}>
            Collection #1<span>38D9d1B10727bDc523f0EFb06CcA30E922a96fd6</span>
          </span>
        </Typography>

        <div className={cls.collections}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <ListItem button component="a">
              <Paper className={cls.element}>
                <div>
                  <img
                    style={{ width: 210, height: 118 }}
                    alt="alt"
                    src="https://blog.allo.ua/wp-content/uploads/Glavnaya-kartinka-15.jpg"
                  />
                </div>
              </Paper>
              <Typography>Test NFT#1</Typography>
            </ListItem>
            <ListItem button component="a" href="/Mintnft">
              <Paper className={cls.element}>
                <div>
                  <div>
                    <AddBoxIcon />
                    <Typography>MINT NFT</Typography>
                  </div>
                </div>
              </Paper>
            </ListItem>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default InsideCol;
