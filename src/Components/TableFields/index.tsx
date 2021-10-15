import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Grid, ListItem, Paper, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

import { ContextApp, setOpen } from 'src/store/reducer';
import { isImageFile } from '../../helpers';
import cls from '../../app.module.scss';
import styles from './styles.module.scss';

const TableFields = ({
  arrayItems,
  linkCreator = null,
  clickCollectionsUrl = null,
}: any) => {
  const history = useHistory();
  const { state, dispatch } = useContext(ContextApp);

  const handleNavigate = () => {
    if (state.auth) {
      history.push(linkCreator);
    } else {
      setOpen(dispatch, true);
    }
  };
  return (
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
          <ListItem button key={c.time || c.address || c.addrData}>
            {clickCollectionsUrl ? (
              <NavLink
                to={`/${clickCollectionsUrl}/${c.address.replace('0:', '')}`}
              >
                <Paper className={cls.element}>
                  {c.file && (
                    <img
                      className={styles.paperImage}
                      alt={c.name}
                      src={isImageFile(c.file) ? c.file : c.defaultImage}
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
              <NavLink to="/token">
                <Paper className={cls.element}>
                  <div>
                    {c.file && (
                      <img
                        className={styles.paperImage}
                        alt={c.name}
                        src={isImageFile(c.file) ? c.file : c.defaultImage}
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
                        src={c.metadata.tokenFileAddress.chunks}
                      />
                    )}
                  </div>
                </Paper>
              </NavLink>
            )}
            <Typography>{c.metadata ? c.metadata.name : c.name}</Typography>
            <Typography>{c.description}</Typography>
          </ListItem>
        ))}
        {linkCreator && (
          <ListItem button onClick={() => handleNavigate()}>
            <div className={cls.new}>
              <Paper className={cls.element}>
                <div>
                  <div>
                    <AddBox />
                    <Typography>
                      Create new <br /> NFT
                    </Typography>
                  </div>
                </div>
              </Paper>
            </div>
          </ListItem>
        )}
      </Grid>
    </div>
  );
};
export default TableFields;
