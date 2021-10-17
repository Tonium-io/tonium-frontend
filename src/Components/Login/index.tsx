import React, { useState, useContext, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { ContextApp, setOpen } from '../../store/reducer';

import styles from './styles.module.scss';

const Login = () => {
  const [
    isAdditionalProviderFieldsRequired,
    setIsAdditionalProviderFieldsRequired,
  ] = useState(false);
  const [selectedProviderName, setSelectedProviderName] = useState<any>('');
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [activeProvider, setActiveProvider] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>(null);
  const isMountedRef = useRef<any>(null);
  const { state, dispatch, toniumNFT } = useContext(ContextApp);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  // const [validate, setValidate] = useState<any>(null);

  // const [indRequiredInitField, setIndRequiredInitField] = useState<any>(null);

  const { open }: any = state;
  const DialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  };
  const handleClose = () => {
    setIsAdditionalProviderFieldsRequired(false);
    setOpen(dispatch, false);
    setSelectedProviderName('');
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

  const handleClickButton = (providerName: string) => {
    if (providerName === 'ExtraTon') {
      setSelectedProviderName(providerName);
      setIsAdditionalProviderFieldsRequired(false);
    } else {
      selectProvider(providerName);
      setSelectedProviderName('');
    }
    setActiveProvider(providerName);
  };
  return (
    <>
      <Dialog
        onClose={() => handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid item xs={12} className={styles.popup}>
          <DialogTitle
            id="customized-dialog-title"
            className={styles.title}
            onClose={handleClose}
          >
            Please select provider
          </DialogTitle>
          <DialogContent className={styles.content}>
            {Object.entries(toniumNFT.getProviders()).map(
              ([providerName, provider]: any) => (
                <div key={providerName}>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={!provider.isAvailable()}
                    onClick={() => handleClickButton(providerName)}
                    className={
                      activeProvider === providerName ? styles.activeBtn : ''
                    }
                  >
                    {providerName}
                  </Button>
                  <div
                    style={{
                      marginTop: 20,
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'column',
                    }}
                  >
                    <small>{provider.description}</small>
                  </div>
                </div>
              ),
            )}
          </DialogContent>

          {selectedProviderName && (
            <Grid
              container
              xs={12}
              direction="row"
              justify="center"
              style={{ margin: '40px 0 0' }}
            >
              <p className={styles.textSignature}>
                On next step the extraton extension will ask you to sign
                authorization message. Please agree, as this allow website to
                communicate with backend system.
              </p>

              <Button
                variant="contained"
                color="primary"
                value="submit"
                type="submit"
                onClick={() => selectProvider(selectedProviderName)}
              >
                Login
              </Button>
            </Grid>
          )}

          {isAdditionalProviderFieldsRequired && (
            <form autoComplete="off">
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
                    .map((field: any) => (
                      <TextField
                        error={!formValues?.[field.name]}
                        key={field.name}
                        onChange={async (e) => {
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
                    ))}
                </Grid>
                <Grid item xs={3}>
                  {toniumNFT
                    .getProviders()
                    [selectedProvider as any].getInitActions()
                    .map((action: any) => (
                      <Button
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
                              if (isMountedRef.current) {
                                nameValue[`${action.name}`] = data;
                                setFormValues(nameValue);
                              }
                            })
                            .catch((e: any) => {
                              toast.error('ERROR', {
                                position: 'bottom-right',
                                autoClose: 4000,
                              });
                              // eslint-disable-next-line no-console
                              console.error(e);
                            });
                        }}
                      >
                        {action.description}
                      </Button>
                    ))}
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center">
                <Button
                  disabled={!formValues}
                  variant="contained"
                  color="primary"
                  value="submit"
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const fields = toniumNFT
                      .getProviders()
                      [selectedProvider as any].getRequiredInitFields();

                    // eslint-disable-next-line no-restricted-syntax
                    for (const field of fields) {
                      if (field.validator) {
                        // eslint-disable-next-line no-await-in-loop
                        const result = await field.validator(
                          formValues[field.name],
                        );
                        if (!result.valid) {
                          e.nativeEvent.stopImmediatePropagation();
                          toast.error(
                            `${field.name} not valid. Please check it and try again`,
                          );
                          return;
                        }
                      }
                    }

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
