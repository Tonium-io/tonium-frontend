import { Button, Grid, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import StyledRadio from '../StyledRadio';

import styles from './styles.module.scss';
import StyledPopover from '../StyledPopover';
/* eslint-disable react/jsx-props-no-spreading */

const CreatorFieldV2 = ({ onSubmit }: any) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  }: any = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction="row">
        <Grid
          item
          container
          spacing={1}
          lg={2}
          md={3}
          xs={6}
          direction="column"
        >
          <Grid item>
            <Controller
              control={control}
              name="image"
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <Button
                  className={styles.addImage}
                  style={errors?.image ? { border: '2px solid #f44336' } : {}}
                  component="label"
                  {...field}
                >
                  <AddBoxIcon fontSize="large" />
                  <Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    ADD IMAGE
                  </Typography>
                  <Typography style={{ fontSize: '0.8rem' }}>
                    JPG or GIF
                  </Typography>
                  <input type="file" hidden />
                </Button>
              )}
            />
          </Grid>
          <Grid item>
            <Typography style={{ fontWeight: 'bold', marginTop: '15px' }}>
              UPLOAD FULL FILE
            </Typography>
            <Controller
              control={control}
              name="fullFile"
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <Button
                  className={styles.uploadFile}
                  style={
                    errors?.fullFile ? { border: '2px solid #f44336' } : {}
                  }
                  component="label"
                >
                  <GetAppIcon fontSize="large" />
                  <input type="file" hidden {...field} />
                </Button>
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="checkbox"
              defaultValue="blockchain"
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <RadioGroup className={styles.radioGroup} {...field}>
                  <FormControlLabel
                    value="blockchain"
                    label="BLOCKCHAIN"
                    control={<StyledRadio />}
                  />
                  <FormControlLabel
                    value="ipfs"
                    label="IPFS"
                    control={<StyledRadio />}
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item>
            <StyledPopover
              className={styles.differentPopover}
              text="DIFFERENT?"
              popoverContent="Popover content"
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          spacing={4}
          lg={4}
          md={5}
          xs={6}
          direction="column"
        >
          <Grid item>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <TextField
                  className={styles.nameInputHeader}
                  inputRef={field.ref}
                  fullWidth
                  error={Boolean(errors?.name)}
                  label="set the name/title"
                  helperText={errors?.name ? errors?.name?.message : ''}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="symbol"
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <TextField
                  className={styles.descInputHeader}
                  inputRef={field.ref}
                  error={Boolean(errors?.symbol)}
                  id="standard-multiline-static"
                  multiline
                  fullWidth
                  rows={4}
                  label="Description"
                  helperText={errors?.symbol ? errors?.symbol?.message : ''}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              className={styles.mintButton}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              MINT NFT
            </Button>

            <Typography className={styles.cost}>
              2
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.23096 15.6893C9.61087 16.0725 10.2257 16.0725 10.6055 15.6893L19.551 6.666C19.9052 6.30875 19.9339 5.73813 19.6174 5.34625L15.5916 0.361625C15.4068 0.13275 15.1301 0 14.838 0H4.99859C4.70637 0 4.42965 0.13275 4.24483 0.361625L0.219026 5.34625C-0.0974197 5.73813 -0.0686856 6.30875 0.285517 6.666L9.23096 15.6893Z"
                  fill="#33A9FB"
                />
              </svg>
              COST
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatorFieldV2;
