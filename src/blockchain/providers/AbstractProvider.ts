/* eslint-disable no-unused-vars */
import contracts from '../contracts.json';

type ContractNames = keyof typeof contracts;

abstract class AbstractProvider {
  inited: Boolean = false;

  private readyPromise!: Promise<boolean>;

  private readyPromiseResolve!: any;

  static getContractRaw(name: ContractNames) {
    return contracts[name];
    // if (contracts[name]) {
    //   return contracts[name];
    // }
    // return false;
  }

  static isAvailable() {
    // overwrite
    return false;
  }

  async whenReady() {
    // eslint-disable-next-line no-debugger
    debugger;
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
    // eslint-disable-next-line no-debugger
    debugger;
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
  ): Promise<any>;

  abstract call(
    contractName: string,
    functionName: string,
    input?: object,
  ): Promise<any>;
}

export default AbstractProvider;
