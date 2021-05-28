import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import ListItem from '@material-ui/core/ListItem';
// import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

import AddBoxIcon from '@material-ui/icons/AddBox';
import BackupIcon from '@material-ui/icons/Backup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';

import cls from '../../app.module.scss';

const MintNft = () => {
  const { collection } = useParams<any>();
  const [load, setLoad] = useState(false);
  const onSubmit = (values: any) => {
    setLoad(true);
    // eslint-disable-next-line no-console
    console.log(values, 'Success');
    toast.success('Success', {
      position: 'bottom-right',
      autoClose: 4000,
    });
  };

  if (load) {
    return <Loader />;
  }
  return (
    <div>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/collections">NFT Collections</NavLink>
        <NavLink to={`/collections/${collection}`}>Collection #1</NavLink>
        <Typography color="textPrimary">Mint NFT</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Mint NFT
        </Typography>

        <div className={cls.createcol}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <div className={cls.create_left}>
              <Paper className={cls.avatar}>
                <div>
                  <img
                    style={{ width: 210, height: 118 }}
                    alt="avatar"
                    src="https://pobedarf.ru/wp-content/uploads/2020/11/depositphotos_98492334_l-2015-pic4_zoom-1500x1500-71566.jpg"
                  />
                </div>
              </Paper>
              <Button
                variant="contained"
                component="label"
                startIcon={<AddBoxIcon />}
              >
                Add image
                <input type="file" hidden />
              </Button>
              <Button
                variant="contained"
                component="label"
                startIcon={<BackupIcon />}
              >
                Upload File
                <input type="file" hidden />
              </Button>
            </div>

            <div className={cls.create_right}>
              <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField label="Title" variant="outlined" />
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                />

                <Button
                  className={cls.submit}
                  variant="contained"
                  component="label"
                  color="secondary"
                  size="large"
                >
                  MINT
                </Button>
              </form>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MintNft;
