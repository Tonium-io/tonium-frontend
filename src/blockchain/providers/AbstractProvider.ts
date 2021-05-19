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
  ): Promise<any>;

  abstract call(
    contractName: string,
    functionName: string,
    input?: object,
  ): Promise<any>;

  abstract getAddress(): Promise<String>;

  abstract getBallance(): Promise<Number>;

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
}

export default AbstractProvider;
