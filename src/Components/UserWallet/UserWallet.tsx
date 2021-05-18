import React from 'react';
import Button from '@material-ui/core/Button';

const UserWallet = () => {
  const onConnectWalletClick = async () => {
    console.log('onConnectWalletClick');
  };

  return (
    <Button variant="contained" onClick={onConnectWalletClick}>
      Connect wallet
    </Button>
  );

  // return <div>here will be a wallet</div>;
};

export default UserWallet;
