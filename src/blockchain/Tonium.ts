import { TonClient, Signer } from '@tonclient/core';
import { Account } from '@tonclient/appkit';

import ExchangerABI from './NFT_market/contracts/Exchanger.abi.json';
import ConterollerABI from './NFT_market/contracts/Controller.abi.json';
import RootTokenContractNFAbi from './NFT_token/RootTokenContractNF.abi.json';

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

  signer: Signer;

  constructor(
    tonClient: TonClient,
    signer: Function,
    contractAdreses: contractAdresesType,
  ) {
    this.contractAdreses = contractAdreses;
    this.tonClient = tonClient;
    this.signer = {
      type: 'SigningBox',
      handle: 1, // todo check what is that
    };

    this.contracts = {
      rootToken: new Account(
        {
          abi: RootTokenContractNFAbi,
          // tvc: '... base64 encoded string ...',
        },
        {
          address: contractAdreses.rootToken,
          signer: this.signer,
          client: tonClient,
        },
      ),
      exchanger: new Account(
        {
          abi: ExchangerABI,
          // tvc: '... base64 encoded string ...',
        },
        {
          address: contractAdreses.exchanger,
          signer: this.signer,
          client: tonClient,
        },
      ),
      controller1: new Account(
        {
          abi: ConterollerABI,
          // tvc: '... base64 encoded string ...',
        },
        {
          address: contractAdreses.controller1,
          signer: this.signer,
          client: tonClient,
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
