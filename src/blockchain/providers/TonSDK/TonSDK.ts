import {
  TonClient,
  signerSigningBox,
  signerNone,
  signerKeys,
  KeyPair,
  accountForExecutorUninit,
} from '@tonclient/core';

import { libWeb } from '@tonclient/lib-web';
import { Account } from '@tonclient/appkit';

import AbstractProvider from '../AbstractProvider';
import { ContractNames } from '../../../constants';

TonClient.useBinaryLibrary(libWeb);

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
  client!: TonClient;

  private mnemonic!: string;

  static description = 'TonSDK based. Fully worked. Recomended to use';

  signerHandle: number = 0;

  // contracts: {
  //   rootToken?: any;
  //   exchanger?: any;
  //   controller?: any;
  // };

  keys: any;

  constructor(initParams?: { mnemonic?: string }) {
    super();
    // this.contracts = {};

    this.client = new TonClient({
      network: {
        endpoints: ['net.ton.dev'], // dev
        // message_processing_timeout: 200000,
      },
      abi: {
        // message_expiration_timeout: 200000,
      },
    });

    this.init(initParams?.mnemonic);
  }

  async getAddress(publicKey = this.getPublicKey(false)): Promise<string> {
    const { address } = this;

    if (!address) {
      await this.whenReady();
      if (!publicKey) {
        return '0';
      }
      const rawContract = TonSDK.getContractRaw('controller');
      const deployOptions = {
        abi: {
          type: 'Contract',
          value: rawContract.abi,
        },
        deploy_set: {
          tvc: rawContract.tvc,

          initial_pubkey: publicKey,
        },
        call_set: {
          function_name: 'constructor',
        },
        signer: {
          type: 'External',
          public_key: publicKey,
        },
      } as const;

      const result = await this.client.abi
        .encode_message(deployOptions)
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(deployOptions);
          // eslint-disable-next-line no-console
          console.error(e);
        });

      if (!result) {
        // eslint-disable-next-line no-console
        console.error('Not able to detect address');
        throw new Error('Not able to detect address');
      }

      // eslint-disable-next-line no-console
      console.log(`Future address of the contract will be: ${result.address}`);
      this.address = result.address;
    }

    return this.address;
  }

  async init(mnemonic?: string) {
    await TonSDK.timeout(1000);

    if (!mnemonic && localStorage.getItem('tonium_mnemonic')) {
      // eslint-disable-next-line no-param-reassign
      mnemonic = localStorage.getItem('tonium_mnemonic') as string;
    }

    if (mnemonic) {
      const keys = await this.keyPairFromPhrase(mnemonic);
      this.keys = signerKeys(keys as KeyPair);
      localStorage.setItem('tonSdkPublic', this.keys.keys.public);
      // console.log('this.keys: ', localStorage.getItem('tonSdkPublic'));
      localStorage.setItem('tonium_mnemonic', mnemonic);
    } else {
      // todo grab from local storage and dencode it
      // todo ask pasword from user to decode mnemonic
      // below from SDK to operate on mnemonic
      //       mnemonic_words ??? Prints the list of words from the specified dictionary
      // mnemonic_from_random ??? Generates a random mnemonic from the specified dictionary and word count
      // mnemonic_from_entropy ??? Generates mnemonic from pre-generated entropy
      // mnemonic_verify ??? The phrase supplied will be checked for word length and validated according to the checksum specified in BIP0039.
      // mnemonic_derive_sign_keys ??? Validates the seed phrase, generates master key and then derives the key pair from the master key and the specified path
      // hdkey_xprv_from_mnemonic ??? Generates an extended master private key that will be the root for all the derived keys
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

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.removeItem('tonium_mnemonic');
    return true;
  }

  async getCodeFromTvc(tvc: string) {
    const codeFromTvc = await this.client.boc.get_code_from_tvc({
      tvc,
    });
    return codeFromTvc.code;
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
    const rawContract = TonSDK.getContractRaw(contractName);
    if (!rawContract) {
      // eslint-disable-next-line no-console
      console.error('Contract not found', contractName);
      return false;
    }
    const message = await this.client.abi.encode_message({
      address,
      abi: {
        type: 'Contract',
        value: rawContract.abi,
      },
      signer: signerNone(),
      call_set: {
        function_name: functionName,
        input,
      },
    });

    const boc = await this.client.net.wait_for_collection({
      collection: 'accounts',
      filter: { id: { eq: address } },
      result: 'boc',
      timeout: 1000,
    });

    const result = await this.client.tvm.run_tvm({
      account: boc.result.boc,
      abi: {
        type: 'Contract',
        value: rawContract.abi,
      },
      message: message.message,
    });
    return result.decoded?.out_messages[0].value;
    // const contract = (await this.getContractAtAddress(
    //   contractName,
    //   address,
    // )) as Account;
    // const result = (await contract.runLocal(functionName, input || {},{performAllChecks:true})) as any;

    // return result.decoded?.out_messages[0].value;
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
    // todo here also parse some data
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

  // async getAddress() {
  // const rawContract = TonSDK.getContractRaw("controller");
  // await this.whenReady();
  // const network = await this.getNetwork();
  // const sign = this.getSigner();
  // const pubkey = this.keys.keys.public;
  // return `0x${pubkey}`;
  // const constroolerContract = (await this.getContractAtAddress(
  //   'controller',
  // )) as Account;
  // const params = await constroolerContract.getParamsOfDeployMessage({
  //   initInput: { public_key: `0x${pubkey}` },
  // });
  // const addr = await this.client.abi.encode_message(params);

  // return addr.address;
  // }

  getPublicKey(withLeadingHex: boolean) {
    // let key = this.keys?.keys.public;

    let key;
    if (this.keys) {
      key = this.keys.keys.publicKey;
    } else {
      key = localStorage.getItem('tonSdkPublic') as string;
    }

    if (withLeadingHex) {
      key = `0x${key}`;
    }
    // eslint-disable-next-line no-console
    console.log('key', key);
    return key;
  }

  // async checkAccount() {
  //   const checkAccount = await this.client.net.query_collection({
  //     collection: 'accounts',
  //     filter: {
  //       id: {
  //         eq: await this.getAddress(),
  //       },
  //     },

  //     result: 'acc_type',
  //   });
  //   return checkAccount?.result[0]?.acc_type;
  // }

  async getContractStatus(address: string) {
    if (address) {
      const balance = await this.client.net.query_collection({
        collection: 'accounts',
        filter: {
          id: {
            eq: address,
          },
        },
        result: 'acc_type',
      });

      if (balance.result?.length) {
        const bln = balance.result[0].acc_type;
        return bln;
      }
    }
    return Number.NaN;
  }

  async getBalance(address: string) {
    // const address = await this.getAddress();
    if (address) {
      const balance = await this.client.net.query_collection({
        collection: 'accounts',
        filter: {
          id: {
            eq: address,
          },
        },
        result: 'balance',
      });

      if (balance.result?.length) {
        const bln = balance.result[0].balance;
        return bln / 1000000000;
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

  async sendMoney(address: string, value: number) {
    const rawContract = TonSDK.getContractRaw('controller');

    const acc = new Account(
      {
        abi: rawContract.abi,
        tvc: rawContract.tvc,
      },
      { signer: this.keys, client: this.client },
    );
    const amount = Math.floor((value + 20) * 1_000_000_000);
    // eslint-disable-next-line no-console
    console.log('send', value + 20, 'rubys to', address);
    return acc.run('sendValue', {
      dest: address,
      amount,
      bounce: false,
    });
  }

  async deployContract(
    contractName: keyof typeof ContractNames,
    noMoneyFallback: (addr: string, value: number) => void,
    initialParams?: {},
    constructorParams?: {},
    // isUseRandomPublicKey?: false,
  ) {
    await this.whenReady();
    const rawContract = TonSDK.getContractRaw(contractName);
    const randomKey = await this.client.crypto.generate_random_sign_keys();
    const deployOptions = {
      abi: {
        type: 'Contract',
        value: rawContract.abi,
      },
      deploy_set: {
        tvc: rawContract.tvc,
        initial_data: initialParams,
        initial_pubkey:
          contractName === 'TNFTCoreNftRoot'
            ? randomKey.public
            : this.keys.keys.public,
      },
      call_set: {
        function_name: 'constructor',
        input: constructorParams,
      },
      signer: {
        type: 'Keys',
        keys: this.keys.keys,
      },
    } as const;

    const result = await this.client.abi
      .encode_message(deployOptions)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(deployOptions);
        // eslint-disable-next-line no-console
        console.error(e);
      });

    if (!result) {
      // eslint-disable-next-line no-console
      console.error('Not able to detect address');
      throw new Error('Not able to detect address');
    }

    // eslint-disable-next-line no-console
    console.log(`Future address of the contract will be: ${result.address}`);

    const addressInfo = await this.getAddresInfo(result.address);

    const executorResult = await this.client.tvm.run_executor({
      account: accountForExecutorUninit(),
      abi: { type: 'Contract', value: rawContract.abi },
      message: result.message,
    });
    // const executorResult = {
    //   fees: { total_account_fees: BigInt(15000000000) },
    // };
    const addressBalance = Number(addressInfo.balance);
    const executorFees = Number(executorResult.fees.total_account_fees);

    if (addressInfo.isInited) return result.address;

    // eslint-disable-next-line no-console
    console.log(
      `Total fee to deploy: ${executorResult.fees.total_account_fees}`,
    );

    if (addressBalance <= executorFees) {
      // eslint-disable-next-line no-console
      console.log(
        `Account balance ${addressInfo.balance} less then total fee to deploy: ${executorResult.fees.total_account_fees}. Transfering money here`,
      );
      const difference = executorFees - addressBalance;
      const fees = difference / 1000000000;

      if (contractName === 'controller') {
        noMoneyFallback(result.address, fees);
        throw new Error('Not enough money');
      }

      const controllerAddress = await this.getAddress();
      const controllerBalance = await this.getBalance(controllerAddress);

      const executorFeesInDec = executorFees / 1_000_000_000;
      if (controllerBalance < executorFeesInDec) {
        noMoneyFallback(
          controllerAddress,
          executorFeesInDec - controllerBalance,
        );
        throw new Error('Not enough money');
      } else {
        try {
          await this.sendMoney(result.address, fees);
        } catch (e: any) {
          throw new Error(e.message);
        }
      }
    }

    const deployResult = await this.client.processing
      .process_message({
        send_events: false,
        message_encode_params: deployOptions,
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new Error(e);
      });

    // eslint-disable-next-line no-console
    console.log(`Success: ${deployResult.transaction.account_addr} `);

    return deployResult.transaction.account_addr;
  }

  async getAddresInfo(address: string) {
    const answer = {
      isExist: false,
      isInited: false,
      balance: 0,
    };
    const { result } = await this.client.net.query_collection({
      collection: 'accounts',
      filter: {
        id: {
          eq: address,
        },
      },
      result: 'acc_type balance code',
    });
    if (result.length === 0) {
      return answer;
    }

    return {
      balance: BigInt(result[0].balance),
      isExist: true,
      isInited: !!result[0].acc_type,
    };
  }

  async deployContractAppKit(
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
    // eslint-disable-next-line no-console
    console.log(info, address);

    if (info.acc_type === 1) {
      // active
      // eslint-disable-next-line no-console
      console.log(`Account with address ${address} is already deployed`);
      // eslint-disable-next-line no-console
      console.log('byt we going to deploy it');
      // return address;
    }

    // const fee = await contract.calcDeployFees();

    const giver = await Account.getGiverForClient(this.client);

    await contract.deploy({
      initInput: constructorParams,
      useGiver: giver,
    });

    return address;
  }

  async signMessage(message: {}) {
    await this.whenReady();
    const result = await this.client.crypto.sign({
      unsigned: btoa(JSON.stringify(message)),
      keys: this.keys.keys,
    });
    return result.signed;
  }
}

export default TonSDK;
