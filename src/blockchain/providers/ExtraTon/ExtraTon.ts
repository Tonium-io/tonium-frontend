/* eslint-disable no-unused-vars */
import freeton from 'freeton';

import AbstractProvider from '../AbstractProvider';

declare const window: any;

class ExtraTon extends AbstractProvider {
  provider: any;

  inited: Boolean = false;

  // contracts: {
  //   rootToken: any;
  //   exchanger: any;
  //   controller: any;
  // };

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.provider = new freeton.providers.ExtensionProvider(window.freeton);

    //  this.contract.rootToken = new freeton.Contract(this.provider, Kington.abi, Kington.networks['2'].address);
    this.inited = true;
  }

  async run(contractName: string, functionName: string, input?: object) {
    console.log(this);
    return '4';
    // const result  = await this.contracts[contractName].runLocal(functionName, input);
    // return result;
  }

  async call(contractName: string, functionName: string, input?: object) {
    console.log(this);
    // const result  = await this.contracts[contractName].run(functionName, input);
    // return result;
  }

  static isAvailable() {
    return window.freeton !== undefined;
  }

  async getNetwork() {
    const network = (await this.provider.getNetwork().id) as Number;
    return network;
  }
}

export default ExtraTon;
