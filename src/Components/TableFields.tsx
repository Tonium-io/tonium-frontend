import { Grid, ListItem, Paper, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

import cls from '../app.module.scss';

const TableFields = ({
  arrayItems,
  linkCreator = null,
  clickCollectionsUrl = null,
}: any) => {
  // todo home page
  // eslint-disable-next-line no-console
  console.log('home');
  return (
    <div className={cls.collections}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        {arrayItems.map((c: any) => (
          <ListItem button component="a" key={c.name}>
            {clickCollectionsUrl ? (
              <NavLink to={`${clickCollectionsUrl}/${c.address}`}>
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
            ) : (
              <Paper className={cls.element}>
                <div>
                  <img
                    style={{ width: 210, height: 118 }}
                    alt="alt"
                    src={c.img}
                  />
                </div>
              </Paper>
            )}
            <Typography>{c.name}</Typography>
          </ListItem>
        ))}
        {linkCreator && (
          <ListItem button component="a">
            <NavLink to={linkCreator}>
              <Paper className={cls.element}>
                <div>
                  <div>
                    <AddBox />
                    <Typography>Create new</Typography>
                  </div>
                </div>
              </Paper>
            </NavLink>
          </ListItem>
        )}
      </Grid>
    </div>
  );
};

export default TableFields;