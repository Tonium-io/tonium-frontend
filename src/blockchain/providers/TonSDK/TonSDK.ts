import { TonClient, signerSigningBox, signerNone } from '@tonclient/core';

import { libWeb } from '@tonclient/lib-web';
import { Account } from '@tonclient/appkit';

import AbstractProvider from '../AbstractProvider';

class TonSDK extends AbstractProvider {
  client: TonClient;

  signerHandle: number = 0;

  contracts: {
    rootToken?: any;
    exchanger?: any;
    controller?: any;
  };

  constructor() {
    super();
    this.contracts = {};
    TonClient.useBinaryLibrary(libWeb);

    this.client = new TonClient({
      network: {
        server_address: 'https://net.ton.dev', // dev
      },
    });

    this.init();
  }

  async init() {
    // const signingBox = await this.client.crypto.register_signing_box({
    //   get_public_key: async () => {
    //     return {
    //       public_key: '0',
    //     };
    //   },
    //   sing: async (params: any) => {
    //     // todo maybe here
    //   },
    // });
    // this.signerHandle = signingBox.handle;

    const contracts = ['rootToken', 'exchanger', 'controller'] as const;

    const network = await this.getNetwork();
    contracts.forEach((key) => {
      const rawContract = TonSDK.getContractRaw(key);
      if (!rawContract) {
        // eslint-disable-next-line no-console
        return console.error('Contract not found', key);
      }
      this.contracts[key] = new Account(
        {
          abi: rawContract.abi,
          tvc: rawContract.tvc,
        },
        {
          address: rawContract.address[network],
          client: this.client,
        },
      );
      return true;
    });

    this.nowReady();
  }

  async run(contractName: string, functionName: string, input?: object) {
    await this.whenReady();
    const result = await this.contracts[contractName].runLocal(
      functionName,
      input,
    );
    return result;
  }

  async call(contractName: string, functionName: string, input?: object) {
    await this.whenReady();
    const result = await this.contracts[contractName].run(functionName, input);
    return result;
  }

  getSigner() {
    if (this.signerHandle) {
      return signerSigningBox(this.signerHandle);
    }
    return signerNone();
  }

  static isAvailable() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  async getNetwork() {
    //  await this.whenReady();
    // todo
    return 2;
  }
}

export default TonSDK;
