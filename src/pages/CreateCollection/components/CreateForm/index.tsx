import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Grid, TextField } from '@material-ui/core';

import styles from './styles.module.scss';

const CreateForm = ({ onSubmit }: any) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  }: any = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        item
        spacing={2}
        lg={3}
        md={5}
        xs={12}
        direction="column"
        alignItems="flex-start"
      >
        <Grid container item>
          <TextField
            {...register('name', { required: 'This field is required' })}
            className={styles.nameInputHeader}
            error={Boolean(errors?.name)}
            label="Collection name"
            fullWidth
            helperText={errors?.name ? errors?.name?.message : ''}
          />
        </Grid>
        <Grid container item>
          <TextField
            {...register('symbol', { required: 'This field is required' })}
            className={styles.descInputHeader}
            error={Boolean(errors?.symbol)}
            label="Description"
            fullWidth
            helperText={errors?.symbol ? errors?.symbol?.message : ''}
            multiline
            rows={4}
          />
        </Grid>
        <Grid container item>
          <Button
            // style={{ background: '#ff00e0', height: 79, width: '100%' }}
            className={styles.createButton}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            CREATE
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateForm;
