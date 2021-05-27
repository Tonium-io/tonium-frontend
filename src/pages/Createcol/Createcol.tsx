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
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

import cls from '../../app.module.scss';
/* eslint-disable react/jsx-props-no-spreading */

const CreateCol = ({ toniumNFT }: any) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  }: any = useForm();

  const onSubmit = (values: any) => {
    toniumNFT.actions.createUserCollections(values.name, values.symbol);
  };

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
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      inputRef={field.ref}
                      error={Boolean(errors?.name)}
                      label="Collection name"
                      variant="outlined"
                      helperText={errors?.name ? errors?.name?.message : ''}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="symbol"
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      inputRef={field.ref}
                      error={Boolean(errors?.symbol)}
                      id="standard-multiline-static"
                      multiline
                      rows={4}
                      label="Description"
                      variant="outlined"
                      helperText={errors?.symbol ? errors?.symbol?.message : ''}
                      {...field}
                    />
                  )}
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
                  style={{ background: '#FF00E0', height: 79 }}
                  type="submit"
                  variant="contained"
                  color="primary"
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
