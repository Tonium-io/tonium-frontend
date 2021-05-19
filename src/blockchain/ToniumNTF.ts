import ExtraTon from './providers/ExtraTon/ExtraTon';
import TonSDK from './providers/TonSDK/TonSDK';
import AbstractProvider from './providers/AbstractProvider';

class TiniumNFT {
  providers: { [key: string]: any } = { ExtraTon, TonSDK };

  provider!: AbstractProvider;

  constructor() {
    if (localStorage.getItem('toniumProvider')) {
      this.setProvider(localStorage.getItem('toniumProvider') as string);
    }
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
  postCreateCollections() {
    const cpllections: [] = [];
    return cpllections; // создание коллекции
  }

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

  getProviders() {
    return this.providers;
  }

  setProvider(providerName: string) {
    if (!this.providers[providerName]) {
      return false;
    }
    this.provider = new (this.getProviders()[
      providerName
    ])() as AbstractProvider;
    localStorage.setItem('toniumProvider', providerName);

    return true;
  }

  getCurrentProvider() {
    return this.provider;
  }
}

export default TiniumNFT;
