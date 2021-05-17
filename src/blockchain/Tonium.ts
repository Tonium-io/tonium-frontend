import { TonClient } from '@tonclient/core';
import { Account } from '@tonclient/appkit';

import RootTokenContractNFAbi from './NFT_market/NFT_token/RootTokenContractNF.abi.json';
import ExchangerABI from './NFT_market/contracts/Exchanger.abi.json';
import ConterollerABI from './NFT_market/contracts/Controller.abi.json';

type contractAdresesType = {
  rootToken: string;
  exchanger: string;
  controller1: string;
};

class Tonium {
  contractAdreses: contractAdresesType;

  tonClient: TonClient;

  contracts: {
    rootToken: Account;
    exchanger: Account;
    controller1: Account;
  };

  signer: Function;

  constructor(
    tonClient: TonClient,
    signer: Function,
    contractAdreses: contractAdresesType,
  ) {
    this.contractAdreses = contractAdreses;
    this.tonClient = tonClient;
    this.signer = signer;

    this.contracts = {
      rootToken: new Account(
        {
          abi: RootTokenContractNFAbi,
          // tvc: '... base64 encoded string ...',
        },
        {
          address: contractAdreses.rootToken,
        },
      ),
      exchanger: new Account(
        {
          abi: ExchangerABI,
          // tvc: '... base64 encoded string ...',
        },
        {
          address: contractAdreses.exchanger,
        },
      ),
      controller1: new Account(
        {
          abi: ConterollerABI,
          // tvc: '... base64 encoded string ...',
        },
        {
          address: contractAdreses.controller1,
        },
      ),
    };
  }

  getCurrentAdresses() {
    return this.contractAdreses;
  }

  getRootTokenName() {
    return this.contracts.rootToken.run('getName', {});
  }

  // eslint-disable-next-line class-methods-use-this
  getAbi() {
    return ConterollerABI;
  }
}

export default Tonium;
