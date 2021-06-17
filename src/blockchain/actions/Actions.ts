import web3Utils from 'web3-utils';

import AbstractProvider from '../providers/AbstractProvider';
import { zeroAddress } from '../../constants';

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

  async deployNFTWallet(address: string) {
    const provider = await this.getCurrentProvider();
    const controllerAddress = await provider.getAddress();
    const deployNFT = await provider.call(
      'controller',
      'deployNFT',
      {
        root_token: address,
      },
      controllerAddress,
    );
    return deployNFT;
  }

  async getInfoTokens(address: string) {
    const provider = await this.getCurrentProvider();
    let lastMintedToken = await this.getLastMintedToken(address);
    let results: any = [];

    if (lastMintedToken === '0') return results;

    while (lastMintedToken) {
      const getInfoToken = provider.run(
        'rootToken',
        'getInfoToken',
        {
          tokenId: lastMintedToken,
        },
        address,
      );
      results.push(getInfoToken);
      lastMintedToken -= 1;
    }

    results = await Promise.all(results);

    let ipfsResults = results.filter((res: any) => res.data === zeroAddress);
    let bcResults = results.filter((res: any) => res.data !== zeroAddress);

    ipfsResults = ipfsResults.map((i: any) => ({
      ...i,
      name: web3Utils.hexToUtf8(`0x${i.name}`),
      tokenData: i.jsonMeta
        ? JSON.parse(web3Utils.hexToUtf8(`0x${i.jsonMeta}`))
        : '',
    }));

    let bcChanks: any = [];
    bcResults.forEach((bsResult: any) =>
      bcChanks.push(provider.run('files', 'getDetails', {}, bsResult.data)),
    );
    bcChanks = await Promise.all(bcChanks);
    bcResults = bcResults.map((i: any, index: number) => {
      const image = web3Utils.hexToUtf8(`0x${bcChanks[index].chunks.join('')}`);
      return {
        ...i,
        name: web3Utils.hexToUtf8(`0x${i.name}`),
        tokenData: i.jsonMeta
          ? JSON.parse(web3Utils.hexToUtf8(`0x${i.jsonMeta}`))
          : '',
        image,
      };
    });

    return [...ipfsResults, ...bcResults];
  }

  async getTokenBlockchainData(address: string) {
    const provider = await this.resolveProviderOrThrow();
    const res = provider.run('files', 'getDetails', {}, address);
    return res;
  }

  async createUserCollections(
    name: string,
    symbol: string,
    noMoneyFallback: (addr: string, value: number) => void,
  ) {
    const provider = await this.resolveProviderOrThrow();

    const walletContract = await Object.getPrototypeOf(
      provider,
    ).constructor.getContractRaw('wallet');

    await provider.deployContract('controller', noMoneyFallback);

    const contractAddress = await provider.deployContract(
      'rootToken',
      noMoneyFallback,
      {},
      {
        name: web3Utils.utf8ToHex(name).replace('0x', ''),
        symbol: web3Utils.utf8ToHex(symbol).replace('0x', ''),
        decimals: 0,
        root_public_key: provider.getPublicKey(true),
        wallet_code: walletContract.tvc,
      },
    );

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

  async createUserCollectionToken(
    address: string,
    name: string,
    jsonMeta = '',
    data: string,
  ) {
    const provider = await this.resolveProviderOrThrow();
    // const addressWallet = await provider.getAddress();

    const currentMintedToken = +(await this.getLastMintedToken(address)) + 1;
    return provider.call(
      'rootToken',
      'mint',
      {
        tokenId: currentMintedToken,
        name: web3Utils.utf8ToHex(name).replace('0x', ''),
        jsonMeta: web3Utils
          .utf8ToHex(JSON.stringify(jsonMeta))
          .replace('0x', ''),
        data,
      },
      address,
    );
    // const wallets = await provider.run(
    //   'controller',
    //   'm_wallets',
    //   {},
    //   addressWallet,
    // );
    //
    // await provider.call(
    //   'rootToken',
    //   'grant',
    //   {
    //     dest: wallets.m_wallets[address],
    //     tokenId: currentMintedToken,
    //     grams: 0,
    //   },
    //   address,
    // );
  }

  async createUserCollectionTokenFile(
    chunks: any[],
    noMoneyFallback: (addr: string, value: number) => void,
  ) {
    const provider = await this.resolveProviderOrThrow();

    const contractAddress = await provider.deployContract(
      'files',
      noMoneyFallback,
      { nonce: Math.floor(Math.random() * 100000) },
      { chunks_count: chunks.length },
    );

    await Promise.all([
      ...chunks.map((chunk: string, index: number) =>
        provider.call('files', 'writeData', { index, chunk }, contractAddress),
      ),
    ]);
    return contractAddress;
  }

  async getCollectionData(address: string) {
    const provider = await this.resolveProviderOrThrow();

    const data = await Promise.all([
      provider.run('rootToken', 'getName', {}, address),
      provider.run('rootToken', 'getSymbol', {}, address),
      provider.run('rootToken', 'getTotalSupply', {}, address),
    ]);

    return {
      address,
      name: web3Utils.hexToUtf8(`0x${data[0].value0}`),
      symbol: web3Utils.hexToUtf8(`0x${data[1].value0}`),
      totalSupply: data[2].value0,
    };
  }

  async getLastMintedToken(address: string) {
    const provider = await this.resolveProviderOrThrow();

    const data = await provider.run(
      'rootToken',
      'getLastMintedToken',
      {},
      address,
    );

    return data.value0;
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
  // putEditCollection(tooken: {}) {
  //   const editToken = {};
  //   return editToken;
  // } //  редактирование колллекции

  // eslint-disable-next-line class-methods-use-this
  getAllNFTAuctions() {
    const aunctions: [] = [];
    return aunctions; // получение всех аукционов
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // postAunctionMark(auction: {}) {
  //   const markAuction = {};
  //   return markAuction; // mark auction
  // }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // postAunctionBid(auction: {}) {
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // const bid = {};
  // return auction;
  // } // do bid

  // eslint-disable-next-line class-methods-use-this
  getAllNFTs() {
    const nfts: [] = [];
    return nfts; // получение всех нфтешек для радара
  }
}

export default Actions;
