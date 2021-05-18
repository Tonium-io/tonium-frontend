/* eslint-disable no-unused-vars */
import contracts from '../contracts.json';

type ContractNames = keyof typeof contracts;

abstract class AbstractProvider {
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
