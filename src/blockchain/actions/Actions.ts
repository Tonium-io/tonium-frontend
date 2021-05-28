import web3Utils from 'web3-utils';

import AbstractProvider from '../providers/AbstractProvider';

declare const window: any;

window.web3Utils = web3Utils;
class Actions {
  private getCurrentProvider: () => AbstractProvider;

  constructor(getCurrentProvider: () => AbstractProvider) {
    this.getCurrentProvider = getCurrentProvider;
  }

  async resolveProviderOrThrow() {
    const provider = await this.getCurrentProvider();
    if (!provider) {
      throw new Error('Please init provider first');
    }
    return provider;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserCollections() {
    let userNFTs = [];
    if (localStorage.getItem('tonuim_userNFT')) {
      const newdata = JSON.parse(
        localStorage.getItem('tonuim_userNFT') as string,
      );
      if (newdata) {
        userNFTs = newdata;
      }
    }

    if (!userNFTs.length) {
      return [];
    }
    const promises = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const collection of userNFTs) {
      promises.push(this.getCollectionData(collection));
    }

    const result = await Promise.all(promises);

    return result;
  }

  async createUserCollections(name: string, symbol: string, tokenURI = '') {
    const provider = await this.resolveProviderOrThrow();

    const walletContract = await Object.getPrototypeOf(
      provider,
    ).constructor.getContractRaw('wallet');
    const contractAddress = await provider
      .deployContract(
        'rootToken',
        {},
        {
          name: web3Utils.utf8ToHex(name).replace('0x', ''),
          symbol: web3Utils.utf8ToHex(symbol).replace('0x', ''),
          tokenURI: web3Utils.utf8ToHex(tokenURI).replace('0x', ''),
          decimals: 0,
          root_public_key: provider.getPublicKey(true),
          wallet_code: walletContract.tvc,
        },
      )
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
    if (!provider) {
      return null;
    }

    if (!contractAddress) {
      return null;
    }
    let userNFTs = [];
    if (localStorage.getItem('tonuim_userNFT')) {
      const newdata = JSON.parse(
        localStorage.getItem('tonuim_userNFT') as string,
      );
      if (newdata) {
        userNFTs = newdata;
      }
    }

    userNFTs.push(contractAddress);
    localStorage.setItem('tonuim_userNFT', JSON.stringify(userNFTs));

    return this.getCollectionData(contractAddress);
  }

  async getCollectionData(address: string) {
    const provider = await this.resolveProviderOrThrow();

    const data = await Promise.all([
      provider.run('rootToken', 'getName', {}, address),
      provider.run('rootToken', 'getSymbol', {}, address),
      provider.run('rootToken', 'getTokenURI', {}, address),
      provider.run('rootToken', 'getTotalSupply', {}, address),
    ]);

    return {
      address,
      name: web3Utils.hexToUtf8(`0x${data[0].value0}`),
      symbol: web3Utils.hexToUtf8(`0x${data[1].value0}`),
      tokenUri: web3Utils.hexToUtf8(`0x${data[2].value0}`),
      totalSupply: data[3].value0,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getAllTokkens() {
    const tokens: [] = [];
    return tokens;
  } // получение всех токкенов аккаунта, которые купил и созданных(с разделением по типам)

  // eslint-disable-next-line class-methods-use-this
  getAllTransactions() {
    const transactions: [] = [];
    return transactions;
  } // получение всех транзакций аккаунта (с разделением по типам)

  // eslint-disable-next-line class-methods-use-this
  postCreateTokken() {
    const createdToken: {} = {};
    return createdToken; // создание токкена
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  putEditCollection(tooken: {}) {
    const editToken = {};
    return editToken;
  } //  редактирование колллекции

  // eslint-disable-next-line class-methods-use-this
  getAllNFTAuctions() {
    const aunctions: [] = [];
    return aunctions; // получение всех аукционов
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  postAunctionMark(auction: {}) {
    const markAuction = {};
    return markAuction; // mark auction
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  postAunctionBid(auction: {}) {
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    const bid = {};
    return auction;
  } // do bid

  // eslint-disable-next-line class-methods-use-this
  getAllNFTs() {
    const nfts: [] = [];
    return nfts; // получение всех нфтешек для радара
  }
}

export default Actions;
