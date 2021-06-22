import React from 'react';
import { NavLink } from 'react-router-dom';

import { Grid, ListItem, Paper, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

import { isImageFile } from '../../helpers';
import cls from '../../app.module.scss';
import styles from './styles.module.scss';

const TableFields = ({
  arrayItems,
  linkCreator = null,
  clickCollectionsUrl = null,
}: any) => (
  <div className={cls.collections}>
    <Grid
      container
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      wrap="wrap"
    >
      {arrayItems.map((c: any) => (
        <ListItem button key={c.time || c.address}>
          {clickCollectionsUrl ? (
            <NavLink
              to={`/${clickCollectionsUrl}/${c.address.replace('0:', '')}`}
            >
              <Paper className={cls.element}>
                {c.file && isImageFile(c.file) && (
                  <img
                    className={styles.paperImage}
                    alt={c.name}
                    src={c.file}
                  />
                )}
                {c.ipfsImage && (
                  <img
                    className={styles.paperImage}
                    alt={c.name}
                    src={`https://ipfs.io/ipfs/${c.ipfsImage}`}
                  />
                )}
                {!c.file && !c.ipfsImage && (
                  <img
                    className={styles.paperImage}
                    alt={c.name}
                    src={c.defaultImage}
                  />
                )}
              </Paper>
            </NavLink>
          ) : (
            <Paper className={cls.element}>
              <div>
                {c.file && isImageFile(c.file) && (
                  <img
                    className={styles.paperImage}
                    alt={c.name}
                    src={c.file}
                  />
                )}
                {c.ipfsImage && (
                  <img
                    className={styles.paperImage}
                    alt={c.name}
                    src={`https://ipfs.io/ipfs/${c.ipfsImage}`}
                  />
                )}
                {!c.file && !c.ipfsImage && (
                  <img
                    className={styles.paperImage}
                    alt={c.name}
                    src={c.defaultImage}
                  />
                )}
              </div>
            </Paper>
          )}
          <Typography>{c.name}</Typography>
          <Typography>{c.description}</Typography>
        </ListItem>
      ))}
      {linkCreator && (
        <ListItem button>
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
export default TableFields;
