import { toast } from 'react-toastify';
import ExtraTon from './providers/ExtraTon/ExtraTon';
import TonSDK from './providers/TonSDK/TonSDK';
import AbstractProvider from './providers/AbstractProvider';
import Actions from './actions/Actions';

import { setLogin } from '../store/reducer';

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
    console.log('Log out');
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

    setLogin(this.dispatch, true);
    console.log('Sucess');
    toast.success('Sucess');
    return true;
  }

  getCurrentProvider() {
    return this.provider;
  }
}

export default TiniumNFT;
