import React, { useContext, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ContextApp, setSendMoneyDialog } from '../../store/reducer';

const SendMoneyDialog: React.FC = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const { state, dispatch, toniumNFT } = useContext(ContextApp);
  const { sendMoneyDialog }: any = state;

  const handleClose = () => {
    setSendMoneyDialog(dispatch, { visible: false, addr: '', value: 0 });
  };

  const handleSend = async () => {
    try {
      const provider = toniumNFT.getCurrentProvider();
      setIsSending(true);
      await provider.sendMoney(sendMoneyDialog.addr, sendMoneyDialog.value);
      setResult('Transaction success. Now create collection.');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Can't send money:", e);
      setResult('Transaction failed.');
    } finally {
      setIsSending(false);
    }
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
        {isSending && (
          <DialogContentText align="center" style={{ marginTop: '20px' }}>
            <CircularProgress />
          </DialogContentText>
        )}
        {result && (
          <div style={{ padding: '20px', fontWeight: 'bold' }}>{result}</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
        {!sendMoneyDialog.controller && (
          <Button onClick={handleSend} color="primary" disabled={!!result}>
            Send
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SendMoneyDialog;
