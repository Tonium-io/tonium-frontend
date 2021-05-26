import React from 'react';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// import ListItem from '@material-ui/core/ListItem';
// import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import cls from '../../app.module.scss';

const CreateCol = () => {
  // todo home page
  // eslint-disable-next-line no-console
  console.log('createcol');
  return (
    <div>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link href="/home">Home</Link>
        <Link href="/mint">NFT Collections</Link>
        <Typography color="textPrimary">Create collection</Typography>
      </Breadcrumbs>
      <div className={cls.content_wrap}>
        <Typography variant="h1" component="h1" gutterBottom>
          Create Collection
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
            </div>

            <div className={cls.create_right}>
              <form noValidate autoComplete="off">
                <TextField label="Collection name" variant="outlined" />
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Select collection type
                  </FormLabel>
                  <RadioGroup aria-label="coltype" name="coltype">
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Base"
                    />
                    <FormControlLabel
                      value="disabled"
                      disabled
                      control={<Radio />}
                      label="Advanced"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  className={cls.submit}
                  variant="contained"
                  component="label"
                  color="secondary"
                  size="large"
                >
                  CREATE
                </Button>
              </form>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CreateCol;
