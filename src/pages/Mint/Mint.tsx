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

const Mint = () => {
  // todo home page
  // eslint-disable-next-line no-console
  console.log('mint');
  return (
    <div className={cls.mint}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link href="/home">Home</Link>
        <Typography color="textPrimary">NFT Collections</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          NFT Collections
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
            <ListItem button component="a">
              <Paper className={cls.element}>
                <div>
                  <img
                    style={{ width: 210, height: 118 }}
                    alt="alt"
                    src="https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg"
                  />
                </div>
              </Paper>
              <Typography>Test NFT#2</Typography>
            </ListItem>
            <ListItem button component="a">
              <Paper className={cls.element}>
                <div>
                  <img
                    style={{ width: 210, height: 118 }}
                    alt="alt"
                    src="https://i.pinimg.com/originals/fb/16/f9/fb16f9c0afed2c195f4732c3f279b77a.jpg"
                  />
                </div>
              </Paper>
              <Typography>Test NFT#3</Typography>
            </ListItem>
            <ListItem button component="a" href="/Createcol">
              <Paper className={cls.element}>
                <div>
                  <div>
                    <AddBoxIcon />
                    <Typography>Create new</Typography>
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

export default Mint;
