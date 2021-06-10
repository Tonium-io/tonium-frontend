import React, { useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ContextApp, setSendMoneyDialog } from '../../store/reducer';

const SendMoneyDialog: React.FC = () => {
  const { state, dispatch } = useContext(ContextApp);
  const { sendMoneyDialog }: any = state;

  const handleClose = () => {
    setSendMoneyDialog(dispatch, { visible: false, addr: '', value: 0 });
  };

  return (
    <Dialog onClose={handleClose} open={!!sendMoneyDialog.visible}>
      <DialogTitle>Send money for deploy</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Send {sendMoneyDialog.value} ruby (+ some fee) to wallet:
        </DialogContentText>
        <TextField
          label="address"
          variant="filled"
          value={sendMoneyDialog.addr || ''}
          style={{ width: '400px' }}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendMoneyDialog;
