/* eslint-disable no-unused-vars */
import freeton from 'freeton';

import AbstractProvider from '../AbstractProvider';

declare const window: any;

class ExtraTon extends AbstractProvider {
  provider: any;

  signer: any;

  contracts: {
    rootToken?: any;
    exchanger?: any;
    controller?: any;
  };

  constructor() {
    super();
    this.contracts = {};
    this.init();
  }

  static async timeout(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
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
    const contracts = ['rootToken', 'exchanger', 'controller'] as const;
    const network = await this.getNetwork();

    contracts.forEach((key) => {
      const rawContract = ExtraTon.getContractRaw(key);
      if (!rawContract) {
        // eslint-disable-next-line no-console
        return console.error('Contract not found', key);
      }

      this.contracts[key] = new freeton.Contract(
        this.signer,
        rawContract.abi,
        rawContract.address[network as any],
      );
      return true;
    });
    this.nowReady();
    return true;
  }

  async run(contractName: string, functionName: string, input?: object) {
    await this.whenReady();
    const result = await this.contracts[contractName].methods[functionName].run(
      input,
    );
    return result;
  }

  async call(contractName: string, functionName: string, input?: object) {
    await this.whenReady();
    // eslint-disable-next-line no-debugger
    debugger;
    const result = await this.contracts[contractName].methods[
      functionName
    ].call(input);
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
    return this.signer.wallet.address;
  }

  // eslint-disable-next-line class-methods-use-this
  async getBallance() {
    return Number.NaN;
  }
}

export default ExtraTon;
