/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import freeton from 'freeton';

import AbstractProvider from '../AbstractProvider';

import ContractNames from '../../../types/Contract';

declare const window: any;

class ExtraTon extends AbstractProvider {
  provider: any;

  static description =
    'ExtraTon extension. HAVE limitations (deploy contracts). Please use TonSDK instead. Will be fixed in future. Able to perform actions';

  signer: any;

  // contracts: {
  //   rootToken?: any;
  //   exchanger?: any;
  //   controller?: any;
  // };

  constructor() {
    super();
    // this.contracts = {};
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
    // eslint-disable-next-line no-debugger
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

  // eslint-disable-next-line class-methods-use-this
  async getBalance() {
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

  async deployContract(
    contractName: keyof typeof ContractNames,
    initialParams?: {},
    constructorParams?: {},
  ) {
    throw new Error(
      'Extra ton not supported deploy contract. Please use another provider',
    );
    const rawContract = ExtraTon.getContractRaw(contractName);
    const contract = new freeton.ContractBuilder(
      this.signer,
      rawContract.abi,
      rawContract.tvc,
    );
    contract.setInitialParams(initialParams);
    contract.setInitialAmount('10000000000');

    const realContract = await contract.deploy(constructorParams);
    await realContract.getDeployProcessing().wait();

    return realContract.address;
  }

  // eslint-disable-next-line class-methods-use-this
  async signMessage(message: string) {
    throw new Error(
      'Extra ton not supported signMessage Please use another provider',
    );
    return 'false';
  }
}

export default ExtraTon;
