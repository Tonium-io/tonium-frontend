import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Grid, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import { isImageFile } from 'src/helpers';
import StyledPopover from 'src/Components/StyledPopover';
import StyledRadio from 'src/Components/StyledRadio';

import styles from './styles.module.scss';

const AddImageButton: any = withStyles(() => ({
  root: {
    width: 165,
    height: 165,
    color: '#000',
    backgroundColor: '#e9e9e9',
    cursor: 'pointer',
    '& > span': {
      flexDirection: 'column',
    },
  },
}))(Button);

const ColorButton = withStyles(() => ({
  root: {
    height: 79,
    width: 247,
    color: '#000',
    background: 'linear-gradient(180deg,#ff00e0 0%,#ba1fc8 100%)',
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
  },
}))(Button);

const CostLegend = withStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: 247,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: '#000',
    '& > svg': {
      margin: '0 5px',
    },
  },
}))(Typography);

const MintForm = ({ onSubmit }: any) => {
  const [image, setImage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
  }: any = useForm();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (files) {
      const loadedFile = files[0];
      if (loadedFile) {
        const { name, type } = loadedFile;
        if (isImageFile(type)) {
          if (fileName) setFileName('');
          setImage(URL.createObjectURL(loadedFile));
        } else {
          if (image) setImage('');
          setFileName(name);
        }
      } else {
        if (fileName) setFileName('');
        if (image) setImage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="row">
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
            <AddImageButton
              style={errors?.files ? { border: '2px solid #f44336' } : {}}
              component="label"
            >
              {!image && !fileName && (
                <>
                  <AddBoxIcon fontSize="large" />
                  <Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Add image <br />
                    <span className={styles.fileText}>jpg or gif</span>
                  </Typography>
                </>
              )}
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className={styles.previewImage}
                />
              )}
              {fileName && <div className={styles.previewFile}>{fileName}</div>}
              <input
                {...register('files', { required: true })}
                type="file"
                hidden
                onInput={handleChangeImage}
              />
            </AddImageButton>
          </Grid>
          <Grid item>
            <span className={styles.downloadText}>Upload full file</span>
            <input className={styles.download} type="file" />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="checkbox"
              defaultValue="blockchain"
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
              popoverContent="When a file is placed in the blockchain, it is stored distributed and remains immutable and non-removable. In this case, the file is stored completely in the NFT. However, the fee for uploading a file may be higher. 
              In IPFS, data is stored locally in the p2p system and transmitted to other users via the protocol. When uploading to IPFS, only the link to the file and the hash are placed into the NFT."
            />
          </Grid>
        </Grid>

        <div className={styles.gridWrap}>
          <Grid
            item
            container
            spacing={4}
            lg={3}
            md={5}
            xs={12}
            direction="column"
          >
            <Grid item>
              <TextField
                {...register('name', { required: 'This field is required' })}
                className={styles.nameInputHeader}
                fullWidth
                error={Boolean(errors?.name)}
                label="Set the name/title"
                helperText={errors?.name ? errors?.name?.message : ''}
              />
            </Grid>
            <Grid item>
              <TextField
                {...register('symbol', { required: 'This field is required' })}
                className={styles.descInputHeader}
                fullWidth
                error={Boolean(errors?.symbol)}
                label="Description"
                multiline
                rows={4}
                helperText={errors?.symbol ? errors?.symbol?.message : ''}
              />
            </Grid>
            <Grid item>
              <ColorButton
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                MINT NFT
              </ColorButton>

              <CostLegend>
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
              </CostLegend>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </form>
  );
};

export default MintForm;
