import AbstractProvider from '../providers/AbstractProvider';

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


    if (!userNFTs.length){
      return [];
    }
    const promises = []
    // eslint-disable-next-line no-restricted-syntax
    for (const collection of userNFTs){
      promises.push(this.getCollectionData(collection))
    }

    const result  = await Promise.all(promises);


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
          name: Actions.stringToHex(name),
          symbol: Actions.stringToHex(symbol),
          tokenURI: Actions.stringToHex(tokenURI),
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
      name: data[0],
      symbol: data[1],
      tokenUri: data[2],
      totalSupply: data[3],
    }
  }

  static stringToHex(string: string) {
    return string
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
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
