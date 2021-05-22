import ExtraTon from './providers/ExtraTon/ExtraTon';
import TonSDK from './providers/TonSDK/TonSDK';
import AbstractProvider from './providers/AbstractProvider';
import Actions from './actions/Actions';

class TiniumNFT {
  providers: { [key: string]: any } = { ExtraTon, TonSDK };

  provider!: AbstractProvider;

  actions: Actions;

  constructor(mnemonic?: string) {
    if (localStorage.getItem('toniumProvider')) {
      if (mnemonic) {
        this.setProvider(
          localStorage.getItem('toniumProvider') as string,
          mnemonic,
        );
      } else {
        this.setProvider(localStorage.getItem('toniumProvider') as string);
      }
    }

    this.actions = new Actions(this.getCurrentProvider.bind(this));
  }

  getActions() {
    return this.actions;
  }

  getProviders() {
    return this.providers;
  }

  setProvider(providerName: string, mnemonic?: string) {
    if (!this.providers[providerName]) {
      return false;
    }
    this.provider = new (this.getProviders()[providerName])(
      mnemonic,
    ) as AbstractProvider;
    localStorage.setItem('toniumProvider', providerName);

    return true;
  }

  getCurrentProvider() {
    // eslint-disable-next-line no-debugger
    return this.provider;
  }
}

export default TiniumNFT;
