/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import freeton from 'freeton';

import { TonClient } from '@tonclient/core';
import AbstractProvider from '../AbstractProvider';
import { ContractNames } from '../../../constants';

declare const window: any;

class ExtraTon extends AbstractProvider {
  provider: any;

  tonClient!: TonClient;

  static description = 'ExtraTon extension';

  signerHandle: number = 0;

  signer: any;

  keys: any;

  // contracts: {
  //   rootToken?: any;
  //   exchanger?: any;
  //   controller?: any;
  // };

  constructor(initParams: any) {
    super();
    console.log('fdsfsa', initParams);

    this.tonClient = new TonClient({
      network: {
        server_address: 'https://net.ton.dev', // dev
      },
    });
    this.init();
  }

  async init(): Promise<any> {
    if (!window.freeton) {
      await ExtraTon.timeout(1000);
      return this.init();
    }
    this.provider = await new freeton.providers.ExtensionProvider(
      window.freeton,
    );
    this.signer = await this.provider.getSigner();

    if (!localStorage.getItem('tonium_signature')) {
      await this.signer.sign(this.signer.publicKey);
    }

    if (localStorage.getItem('tonium_signature')) {
      localStorage.getItem('tonium_signature') as string;
    } else {
      localStorage.setItem('tonium_signature', this.signer.publicKey);
    }

    // const contracts = ['rootToken', 'exchanger', 'controller'] as const;

    // // eslint-disable-next-line no-restricted-syntax
    // for (const contract of contracts){
    //   // todo fix in future (no time now :( )
    //   // eslint-disable-next-line no-await-in-loop
    //   this.contracts[contract] = await this.getContractAtAddress(contract);
    // }

    this.nowReady();
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.removeItem('tonium_signature');
    return true;
  }

  async getContractAtAddress(
    contract: keyof typeof ContractNames,
    address?: string,
  ) {
    const rawContract = ExtraTon.getContractRaw(contract);
    if (!rawContract) {
      // eslint-disable-next-line no-console
      console.error('Contract not found', rawContract);
      return false;
    }
    const network = await this.getNetwork();

    const realAddres = address ?? rawContract.address[network as any];

    const tonContract = new freeton.Contract(
      this.signer,
      rawContract.abi,
      realAddres,
    );

    return tonContract;
  }

  async run(
    contractName: keyof typeof ContractNames,
    functionName: string,
    input?: object,
    address?: string,
  ) {
    await this.whenReady();
    const result = (
      await this.getContractAtAddress(contractName, address)
    ).methods[functionName].run(input);
    return result;
  }

  async call(
    contractName: keyof typeof ContractNames,
    functionName: string,
    input?: object,
    address?: string,
  ) {
    await this.whenReady();
    const result = (
      await this.getContractAtAddress(contractName, address)
    ).methods[functionName].call(input);
    return result;
  }

  static isAvailable() {
    return window.freeton !== undefined;
  }

  async getNetwork() {
    const network = await this.provider.getNetwork();
    return network.id;
  }

  async getAddress() {
    await this.whenReady();
    return this.signer?.wallet.address;
  }

  async getBalance() {
    const address = await this.getAddress();
    if (address) {
      const balance = await this.tonClient.net.query_collection({
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

  // eslint-disable-next-line class-methods-use-this
  async checkAccount() {
    return Number.POSITIVE_INFINITY;
  }

  getPublicKey(withLeadingHex = false) {
    let key = this.signer.publicKey;
    if (withLeadingHex) {
      key = `0x${key}`;
    }
    return key;
  }

  // todo full function
  async sendMoney(address: string, value: number) {
    const key = this.signer.publicKey;
    const result = address || value || key;
    return !!result;
  }

  async deployContract(
    contractName: keyof typeof ContractNames,
    noMoneyFallback: (addr: string, value: number) => void,
    initialParams?: {},
    constructorParams?: {},
  ) {
    if (contractName === 'controller') return null;

    const rawContract = ExtraTon.getContractRaw(contractName);
    const contract = new freeton.ContractBuilder(
      this.signer,
      rawContract.abi,
      rawContract.tvc,
    );

    let publicKey: string;
    if (contractName === 'rootToken') {
      const randomKey = await this.tonClient.crypto.generate_random_sign_keys();
      publicKey = randomKey.public;
    } else {
      publicKey = this.getPublicKey(false);
    }

    contract.setInitialPublicKey(publicKey);
    contract.setInitialParams(initialParams);
    contract.setInitialAmount('7000000000');
    const realContract = await contract.deploy(constructorParams);
    try {
      await realContract.getDeployProcessing().wait();
    } catch (e) {
      return null;
    }
    return realContract.address;
  }

  async getAddresInfo(address: string) {
    const answer = {
      isExist: false,
      isInited: false,
      balance: 0,
    };
    const { result } = await this.tonClient.net.query_collection({
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

  async signMessage(message: {}) {
    await this.whenReady();
    const result = await this.tonClient.crypto.sign({
      unsigned: btoa(JSON.stringify(message)),
      keys: this.signer.publicKey,
    });
    return result.signed;
  }
}

export default ExtraTon;
