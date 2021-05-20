import { TonClient } from '@tonclient/core';
import { Account } from '@tonclient/appkit';

// import ExchangerABI from './NFT_market/contracts/Exchanger.abi.json';
// import ConterollerABI from './NFT_market/contracts/Controller.abi.json';
// import RootTokenContractNFAbi from './NFT_token/RootTokenContractNF.abi.json';

type contractAdresesType = {
  rootToken: string;
  exchanger: string;
  controller1: string;
};

class Tonium {
  contractAdreses: contractAdresesType;

  tonClient: TonClient;

  contracts!: {
    rootToken: Account;
    exchanger: Account;
    controller1: Account;
  };

  getSigner: Function;

  constructor(
    tonClient: TonClient,
    getSigner: Function,
    contractAdreses: contractAdresesType,
  ) {
    this.contractAdreses = contractAdreses;
    this.tonClient = tonClient;
    this.getSigner = getSigner;

    // this.contracts = {
    //   rootToken: new Account(
    //     {
    //       abi: RootTokenContractNFAbi,
    //       // tvc: '... base64 encoded string ...',
    //     },
    //     {
    //       address: contractAdreses.rootToken,
    //       client: tonClient,
    //     },
    //   ),
    //   exchanger: new Account(
    //     {
    //       abi: ExchangerABI,
    //       // tvc: '... base64 encoded string ...',
    //     },
    //     {
    //       address: contractAdreses.exchanger,
    //       client: tonClient,
    //     },
    //   ),
    //   controller1: new Account(
    //     {
    //       abi: ConterollerABI,
    //       // tvc: '... base64 encoded string ...',
    //     },
    //     {
    //       address: contractAdreses.controller1,
    //       client: tonClient,
    //     },
    //   ),
    // };
  }

  async getRootTokenName() {
    return this.contracts.rootToken.run('getName', {});
  }

  async getRootTokenSymbol() {
    return this.contracts.rootToken.run('getSymbol', {});
  }

  async getExchangerCommission() {
    return this.contracts.exchanger.run('commission', {});
  }

  async getExchangerPairs() {
    return this.contracts.exchanger.run(
      'pairs',
      {},
      { signer: this.getSigner() },
    );
  }
}

export default Tonium;
