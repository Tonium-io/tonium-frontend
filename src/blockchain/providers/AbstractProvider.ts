import ContractNamesType from '../../types/Contract';
/* eslint-disable no-unused-vars */
import contracts from '../contracts.json';

abstract class AbstractProvider {
  inited: Boolean = false;

  static description = 'PROVIDE DESCRIPTION';

  private readyPromise!: Promise<boolean>;

  private readyPromiseResolve!: any;

  static getContractRaw(name: keyof typeof ContractNamesType) {
    return contracts[name];
    // if (contracts[name]) {
    //   return contracts[name];
    // }
    // return false;
  }

  static async timeout(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  static isAvailable() {
    // overwrite
    return false;
  }

  async whenReady() {
    if (this.inited) {
      return Promise.resolve();
    }
    if (!this.readyPromise) {
      this.readyPromise = new Promise((resolve) => {
        this.readyPromiseResolve = resolve;
      });
    }
    return this.readyPromise;
  }

  nowReady() {
    this.inited = true;
    if (this.readyPromiseResolve) {
      this.readyPromiseResolve(true);
      this.readyPromiseResolve = null;
    }
  }

  abstract getNetwork(): Promise<Number>;

  abstract run(
    contractName: string,
    functionName: string,
    input?: object,
    address?: string,
  ): Promise<any>;

  abstract call(
    contractName: string,
    functionName: string,
    input?: object,
    address?: string,
  ): Promise<any>;

  abstract getAddress(): Promise<String>;

  abstract logout(): boolean;

  abstract getPublicKey(withLeadingHex: boolean): String;

  abstract getBalance(): Promise<Number>;

  static getRequiredInitFields(): Array<{
    name: String;
    description: String;
    validator?: Function;
  }> {
    return [];
  }

  static getInitActions(): Array<{
    name: String;
    description: String;
    action?: Function;
  }> {
    return [];
  }

  abstract deployContract(
    contractName: keyof typeof ContractNamesType,
    initialParams?: {},
    constructorParams?: {},
  ): Promise<string>;

  abstract signMessage(message: string): Promise<string>;
}

export default AbstractProvider;
