import { TonClient, signerSigningBox, signerNone } from '@tonclient/core';

import { libWeb } from '@tonclient/lib-web';
import { Account } from '@tonclient/appkit';

import AbstractProvider from '../AbstractProvider';

class TonSDK extends AbstractProvider {
  client: TonClient;

  private mnemonic!: string;

  signerHandle: number = 0;

  contracts: {
    rootToken?: any;
    exchanger?: any;
    controller?: any;
  };

  constructor(mnemonic?: string) {
    super();
    this.contracts = {};
    TonClient.useBinaryLibrary(libWeb);

    this.client = new TonClient({
      network: {
        server_address: 'https://net.ton.dev', // dev
      },
    });

    if (mnemonic) {
      this.mnemonic = mnemonic;
      // todo localstorage and encode it
    } else {
      // todo grab from local storage and dencode it
      // todo ask pasword from user to decode mnemonic
      // below from SDK to operate on mnemonic
      //       mnemonic_words – Prints the list of words from the specified dictionary
      // mnemonic_from_random – Generates a random mnemonic from the specified dictionary and word count
      // mnemonic_from_entropy – Generates mnemonic from pre-generated entropy
      // mnemonic_verify – The phrase supplied will be checked for word length and validated according to the checksum specified in BIP0039.
      // mnemonic_derive_sign_keys – Validates the seed phrase, generates master key and then derives the key pair from the master key and the specified path
      // hdkey_xprv_from_mnemonic – Generates an extended master private key that will be the root for all the derived keys
    }

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

  async getAddress() {
    if (this.mnemonic) {
      return '222';
      // todo grab from mnemonic
    }
    return '';
  }

  async getBallance() {
    if (this.getAddress()) {
      const balance = await this.client.net.query_collection({
        collection: 'accounts',
        filter: {
          id: {
            eq: await this.getAddress(),
          },
        },
        result: 'balance',
      });

      if (balance.result?.length) {
        return balance.result[0].balance;
      }
    }
    return Number.NaN;
  }

  static getRequiredInitFields() {
    const client = new TonClient();
    return [
      {
        name: 'mnemonic',
        description: 'Mnemonic',
        validator: async (mnemonic: string) =>
          client.crypto.mnemonic_verify({
            phrase: mnemonic,
          }),
      },
    ];
  }

  static getInitActions() {
    const client = new TonClient();

    return [
      {
        name: 'mnemonic',
        description: 'Generate mnemonic',
        action: async () => {
          const mnemonic = await client.crypto.mnemonic_from_random({});
          return mnemonic.phrase;
        },
      },
    ];
  }
}

export default TonSDK;
