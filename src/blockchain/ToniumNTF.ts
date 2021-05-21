import ExtraTon from './providers/ExtraTon/ExtraTon';
import TonSDK from './providers/TonSDK/TonSDK';
import AbstractProvider from './providers/AbstractProvider';
import Actions from './actions/Actions';

class TiniumNFT {
  providers: { [key: string]: any } = { ExtraTon, TonSDK };

  provider!: AbstractProvider;

  actions: Actions;

  state: any;

  dispatch: Function;

  constructor(state: any, dispatch: Function) {
    this.state = state;
    this.dispatch = dispatch;
    if (localStorage.getItem('toniumProvider')) {
      this.setProvider(localStorage.getItem('toniumProvider') as string);
    }

    this.actions = new Actions(this.getCurrentProvider);
  }

  getActions() {
    return this.actions;
  }

  getProviders() {
    return this.providers;
  }

  providerLogout() {
    this.getCurrentProvider().logout();
    localStorage.removeItem('toniumProvider');
  }

  setProvider(providerName: string, additionaInitParams?: {}) {
    if (!this.providers[providerName]) {
      return false;
    }
    this.provider = new (this.getProviders()[providerName])(
      additionaInitParams,
    ) as AbstractProvider;
    localStorage.setItem('toniumProvider', providerName);

    // todo set state ;

    return true;
  }

  getCurrentProvider() {
    return this.provider;
  }
}

export default TiniumNFT;
