import {
  TonClient,
  signerSigningBox,
  signerNone,
  signerKeys,
} from '@tonclient/core';

import { libWeb } from '@tonclient/lib-web';
import { Account } from '@tonclient/appkit';

import AbstractProvider from '../AbstractProvider';
import ContractNames from '../../../types/Contract';

// const SEED_PHRASE_WORD_COUNT = 12;
// const SEED_PHRASE_DICTIONARY_ENGLISH = 1;
// const HD_PATH = "m/44'/396'/0'/0/0";
// const seedPhrase = "abandon math mimic master filter design carbon crystal rookie group knife young";

// class dummySigningBox {
//   mnemonic: string;
//   client: TonClient;
//   keys: any;
//   /**
//    *
//    * @param client {TonClient}
//    */
//   constructor(client: TonClient,mnemonic: string) {
//       this.client = client;
//       this.mnemonic = seedPhrase;
//   }

//   async ensureKeys() {
//       if (!this.keys) {
//           this.keys = (await this.client.crypto.mnemonic_derive_sign_keys({
//               dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
//               word_count: SEED_PHRASE_WORD_COUNT,
//               phrase: this.mnemonic,
//               path: HD_PATH,
//           }));
//       }
//       return this.keys;
//   }

//   async get_public_key() {
//       return {
//           public_key: (await this.ensureKeys()).public,
//       };
//   }

//   async sign(params : object) {
//       return (await this.client.crypto.sign({
//           keys: await this.ensureKeys(),
//           unsigned: params.unsigned,
//       }));
//   }
// }

class TonSDK extends AbstractProvider {
  client: TonClient;

  private mnemonic!: string;

  signerHandle: number = 0;

  // contracts: {
  //   rootToken?: any;
  //   exchanger?: any;
  //   controller?: any;
  // };

  keys: any;

  constructor(mnemonic?: string) {
    super();
    // this.contracts = {};
    TonClient.useBinaryLibrary(libWeb);

    this.client = new TonClient({
      network: {
        server_address: 'https://net.ton.dev', // dev
      },
    });

    this.init(mnemonic);
  }

  //   async getAddress_controller(): Promise<string> {
  //     let address = this.address;
  //     if (address === null) {
  //         const deployParams = this.client.getParamsOfDeployMessage({
  //             initFunctionName: null,
  //         });
  //         address = (await this.client.abi.encode_message(deployParams)).address;
  //         this.address = address;
  //     }
  //     return address;
  // }

  async init(mnemonic?: string) {
    if (mnemonic) {
      this.keys = signerKeys(await this.keyPairFromPhrase(mnemonic));
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

    // const signingBox = await signerSigningBox((await this.client.crypto.register_signing_box(signingBox)).handle);
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

    // const contracts = ['rootToken', 'exchanger', 'controller'] as const;

    // const network = await this.getNetwork();
    // contracts.forEach((key) => {
    //   const rawContract = TonSDK.getContractRaw(key);
    //   if (!rawContract) {
    //     // eslint-disable-next-line no-console
    //     return console.error('Contract not found', key);
    //   }
    //   this.contracts[key] = new Account(
    //     {
    //       abi: rawContract.abi,
    //       tvc: rawContract.tvc,
    //     },
    //     {
    //       signer: this.keys,
    //       address: rawContract.address[network],
    //       client: this.client,
    //     },
    //   );
    //   return true;
    // });

    this.nowReady();
  }

  async getContractAtAddress(
    contract: keyof typeof ContractNames,
    address?: any,
    initialParams?: {},
  ) {
    const rawContract = TonSDK.getContractRaw(contract);
    if (!rawContract) {
      // eslint-disable-next-line no-console
      console.error('Contract not found', contract);
      return false;
    }
    const network = await this.getNetwork();

    const realAddres =
      address !== 'undefined' ? address : rawContract.address[network as any];
    const tonContract = new Account(
      {
        abi: rawContract.abi,
        tvc: rawContract.tvc,
      },
      {
        signer: this.keys,
        address: realAddres,
        client: this.client,
        initData: initialParams,
      },
    );
    return tonContract;
  }

  async keyPairFromPhrase(input: string) {
    const HD_PATH = "m/44'/396'/0'/0/0";
    const SEED_PHRASE_WORD_COUNT = input.split(' ').length;
    const SEED_PHRASE_DICTIONARY_ENGLISH = 1;

    // should check 12 or 24 word by raise on another

    const result = await this.client.crypto.mnemonic_derive_sign_keys({
      dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
      word_count: SEED_PHRASE_WORD_COUNT,
      phrase: input,
      path: HD_PATH,
    });
    return result;
  }

  async run(
    contractName: keyof typeof ContractNames,
    functionName: string,
    input?: object,
    address?: string,
  ) {
    await this.whenReady();
    const contract = (await this.getContractAtAddress(
      contractName,
      address,
    )) as Account;
    const result = await contract.runLocal(functionName, input || {});
    return result;
  }

  async call(
    contractName: keyof typeof ContractNames,
    functionName: string,
    input?: object,
    address?: string,
  ) {
    await this.whenReady();
    const contract = (await this.getContractAtAddress(
      contractName,
      address,
    )) as Account;
    const result = await contract.run(functionName, input || {});
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
    // const rawContract = TonSDK.getContractRaw("controller");
    // const network = await this.getNetwork();
    // const sign = this.getSigner();
    const pubkey = this.keys.keys.public;
    const constroolerContract = (await this.getContractAtAddress(
      'controller',
    )) as Account;
    const params = await constroolerContract.getParamsOfDeployMessage({
      initInput: { public_key: `0x${pubkey}` },
    });
    const addr = await this.client.abi.encode_message(params);

    return addr.address;
  }

  getPublicKey(withLeadingHex: boolean) {
    let key = this.keys.keys.public;
    if (withLeadingHex) {
      key = `0x${key}`;
    }
    return key;
  }

  async getBalance() {
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
    TonClient.useBinaryLibrary(libWeb);
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
    TonClient.useBinaryLibrary(libWeb);

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

  async deployContract(
    contractName: keyof typeof ContractNames,
    initialParams?: {},
    constructorParams?: {},
  ) {
    const contract = (await this.getContractAtAddress(
      contractName,
      null,
      initialParams,
    )) as Account;

    const address = await contract.getAddress();
    let info;
    try {
      info = await contract.getAccount();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Account with address ${address} isn't exist`);
      return '';
    }

    if (info.acc_type === 1) {
      // active
      // eslint-disable-next-line no-console
      console.log(`Account with address ${address} is already deployed`);
      console.log('byt we going to deploy it');
      // return address;
    }

    // const fee = await contract.calcDeployFees();

    const giver = await Account.getGiverForClient(this.client);

    console.log(constructorParams);

    await contract.deploy({
      initInput: constructorParams,
      useGiver: giver,
    });

    return address;
  }
}

export default TonSDK;
