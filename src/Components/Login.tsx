import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import cls from '../app.module.scss';
import { ContextApp, setOpen, setLoad } from '../store/reducer';

/* eslint-disable react/jsx-props-no-spreading */
const Login = ({ toniumNFT }: any) => {
  const DialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={cls.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={cls.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  };
  const [
    isAdditionalProviderFieldsRequired,
    setIsAdditionalProviderFieldsRequired,
  ] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>(null);
  const [validate, setValidate] = useState<any>(null);

  // const [indRequiredInitField, setIndRequiredInitField] = useState<any>(null);

  const { state, dispatch } = useContext(ContextApp);

  const { open, load }: any = state;
  useEffect(() => {
    console.log(formValues?.mnemonic);

    toniumNFT
      .getProviders()
      .TonSDK.getRequiredInitFields()[0]
      .validator(formValues?.mnemonic)
      .then((data: any) => {
        setLoad(dispatch, true);
        setValidate(data);
        setLoad(dispatch, false);
      })
      .catch((err: any) => console.error(err));
  }, [formValues]);

  console.log(validate, 'Load');
  const handleClose = () => {
    setIsAdditionalProviderFieldsRequired(false);
    setOpen(dispatch, false);
  };

  const selectProvider = (name: string) => {
    if (toniumNFT.getProviders()[name].getRequiredInitFields().length) {
      setSelectedProvider(name as any);
      setIsAdditionalProviderFieldsRequired(true);
    } else {
      toniumNFT.setProvider(name);
      handleClose();
    }
  };
  return (
    <>
      <Dialog
        onClose={() => handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid item xs={12} className={cls.poapup}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            className={cls.poapup__title}
          >
            Please select provider
          </DialogTitle>
          <DialogContent className={cls.poapup__content}>
            {Object.entries(toniumNFT.getProviders()).map(
              ([providerName, provider]: any) => (
                <div key={providerName}>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={!provider.isAvailable()}
                    onClick={() => selectProvider(providerName)}
                  >
                    {providerName}
                  </Button>
                </div>
              ),
            )}
          </DialogContent>

          {isAdditionalProviderFieldsRequired && (
            <form
              autoComplete="off"
              className={cls.mnemonic}
              onSubmit={(data) => console.log(data, 'DATA')}
            >
              <Grid
                container
                xs={12}
                direction="row"
                justify="center"
                style={{ margin: '50px 0' }}
              >
                <Grid item xs={7}>
                  {toniumNFT
                    .getProviders()
                    [selectedProvider as any].getRequiredInitFields()
                    .map((field: any) => {
                      console.log(field);
                      return (
                        <TextField
                          disabled={load}
                          error={!formValues?.[field.name]}
                          key={field.name}
                          onChange={(e) => {
                            const newValues = { ...formValues } || {};

                            newValues[field.name] = e.target.value;

                            setFormValues(newValues);
                          }}
                          value={formValues?.[field.name] || ''}
                          name={field.name}
                          label={field.description}
                          fullWidth
                          helperText={
                            !formValues?.[`${field.name}`]
                              ? 'This field is required'
                              : ''
                          }
                        />
                      );
                    })}
                </Grid>
                <Grid item xs={3}>
                  {toniumNFT
                    .getProviders()
                    [selectedProvider as any].getInitActions()
                    .map((action: any) => (
                      <Button
                        disabled={load}
                        variant="outlined"
                        key={action.name}
                        color="primary"
                        id={action.name}
                        style={{ height: '100%', marginLeft: 20 }}
                        onClick={() => {
                          const nameValue = { ...formValues };

                          action
                            .action()
                            .then((data: any) => {
                              setLoad(dispatch, true);
                              nameValue[`${action.name}`] = data;
                              setFormValues(nameValue);
                              setLoad(dispatch, false);
                            })
                            .catch((e: any) => console.error(e.message));
                        }}
                      >
                        {action.description}
                      </Button>
                    ))}
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center">
                <Button
                  disabled={!formValues || load}
                  variant="contained"
                  color="primary"
                  value="submit"
                  type="submit"
                  onClick={() => {
                    toniumNFT.setProvider(
                      selectedProvider as any,
                      formValues as {},
                    );
                    handleClose();
                  }}
                >
                  Login
                </Button>
              </Grid>
            </form>
          )}
        </Grid>
      </Dialog>
    </>
  );
};

export default Login;
