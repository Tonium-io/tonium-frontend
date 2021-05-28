import {
  Breadcrumbs,
  Grid,
  ListItem,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ContextApp, setUserCollenctionTokens } from '../../store/reducer';
import cls from './Collection.module.scss';
import Loader from '../../Components/Loader';

const Collection = () => {
  const { collection } = useParams<any>();
  // eslint-disable-next-line no-console
  console.log(collection, 'Col');
  // todo radar page
  const { state, dispatch } = useContext(ContextApp);
  const { userCollections }: any = state;
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (state.auth) {
      setLoad(true);
      // to do ajax
      const payload = [
        { name: 'Test1', address: '0:x12312312432534453' },
        { name: 'Test2', address: '0:x12312332425532535' },
      ];
      setUserCollenctionTokens(dispatch, payload);
      setLoad(false);
    }
  }, []);

  if (load) {
    return <Loader />;
  }
  return (
    <div className={cls.mint}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <NavLink to="/home">Home</NavLink>
        <Typography color="textPrimary">{`COLLECTION `}</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          {`COLLECTION `}
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

export default Collection;
