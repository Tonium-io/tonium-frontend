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
    let userNFTs = localStorage.getItem('tonuim_userNFT');
    if (userNFTs) {
      userNFTs = JSON.parse(userNFTs);
    }

    // todo grab info
  }

  async createUserCollections(name: string, symbol: string, tokenURI = '') {
    const provider = await this.resolveProviderOrThrow();
    const walletContract = await Object.getPrototypeOf(
      provider,
    ).constructor.getContractRaw('wallet');
    const contract = await provider.deployContract(
      'rootToken',
      {
        name: Actions.stringToHex(name),
        symbol: Actions.stringToHex(symbol),
        tokenURI: Actions.stringToHex(tokenURI),
        decimals: 0,
        root_public_key: provider.getPublicKey(true),
        wallet_code: walletContract.tvc,
      },
      {},
    );
    // eslint-disable-next-line no-console
    console.log(contract);
    return []; // создание коллекции
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
