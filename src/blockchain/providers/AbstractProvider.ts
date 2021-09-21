import contracts from '../contracts.json';
import { ContractNames } from '../../constants';

abstract class AbstractProvider {
  inited: Boolean = false;

  address: string = '';

  static description = 'PROVIDE DESCRIPTION';

  private readyPromise!: Promise<boolean>;

  private readyPromiseResolve!: any;

  static getContractRaw(name: keyof typeof ContractNames) {
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

  abstract getAddress(): Promise<string>;

  abstract logout(): boolean;

  abstract getPublicKey(withLeadingHex: boolean): String;

  abstract getBalance(): Promise<Number>;

  //  abstract getContractAtAddress():

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
    contractName: keyof typeof ContractNames,
    noMoneyFallback: (addr: string, value: number) => void,
    initialParams?: {},
    constructorParams?: {},
    isUseRandomPublicKey?: boolean,
  ): Promise<string>;

  abstract sendMoney(address: string, value: number): Promise<any>;

  abstract signMessage(message: {}): Promise<string>;
}

export default AbstractProvider;
