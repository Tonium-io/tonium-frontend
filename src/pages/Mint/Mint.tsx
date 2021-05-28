import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
// import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';

import cls from '../../app.module.scss';
import { ContextApp } from '../../store/reducer';
import Loader from '../../Components/Loader';

const Mint = () => {
  // todo home page
  // eslint-disable-next-line no-console
  const { state } = useContext(ContextApp);
  const { userCollections }: any = state;
  if (state.load) {
    return <Loader />;
  }
  // eslint-disable-next-line no-console
  console.log('Mint');
  return (
    <div className={cls.mint}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <NavLink to="/home">Home</NavLink>
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
            {userCollections.map((c: any) => (
              <ListItem button component="a" key={c}>
                <NavLink to={`collections/${c.address}`}>
                  <Paper className={cls.element}>
                    <div>
                      <img
                        style={{ width: 210, height: 118 }}
                        alt="alt"
                        src={c.img}
                      />
                    </div>
                  </Paper>
                </NavLink>
                <Typography>{c.name}</Typography>
              </ListItem>
            ))}
            <ListItem button component="a">
              <NavLink to="/collections/new">
                <Paper className={cls.element}>
                  <div>
                    <div>
                      <AddBoxIcon />
                      <Typography>Create new</Typography>
                    </div>
                  </div>
                </Paper>
              </NavLink>
            </ListItem>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Mint;
