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
  getAllTokkens() {
    const tokens: [] = [];
    return tokens;
  } // получение всех токкенов аккаунта, которые купил и созданных(с разделением по типам)

  getAllTransactions() {
    const transactions: [] = [];
    return transactions;
  } // получение всех транзакций аккаунта (с разделением по типам)

  postCreateCollections() {
    const cpllections: [] = [];
    return cpllections; // создание коллекции
  }

  postCreateTokken() {
    const createdToken: {} = {};
    return createdToken; // создание токкена
  }

  putEditCollection(tooken: {}) {
    const editToken = {};
    return editToken;
  } //  редактирование колллекции

  getAllNFTAuctions() {
    const aunctions: [] = [];
    return aunctions; // получение всех аукционов
  }

  postAunctionMark(auction: {}) {
    const markAuction = {};
    return markAuction; // mark auction
  }

  postAunctionBid(auction: {}) {
    const bid = {};
    return auction;
  } // do bid

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
