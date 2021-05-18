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
