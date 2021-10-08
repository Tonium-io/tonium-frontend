import { toast } from 'react-toastify';
import ExtraTon from './providers/ExtraTon/ExtraTon';
import TonSDK from './providers/TonSDK/TonSDK';
import AbstractProvider from './providers/AbstractProvider';
import Actions from './actions/Actions';

import Api from '../api/Api';

import { setLogin } from '../store/reducer';

class TiniumNFT {
  providers: { [key: string]: any } = { ExtraTon, TonSDK };

  api: Api;

  provider!: AbstractProvider;

  actions: Actions;

  state: any;

  dispatch: Function;

  constructor(state: any, dispatch: Function) {
    this.state = state;
    this.dispatch = dispatch;
    if (localStorage.getItem('tonium_provider')) {
      this.setProvider(localStorage.getItem('tonium_provider') as string);
    }
    this.actions = new Actions(this.getCurrentProvider.bind(this));
    this.api = new Api(this.getApiSignature.bind(this));
  }

  getActions() {
    return this.actions;
  }

  getProviders() {
    return this.providers;
  }

  providerLogout() {
    this.getCurrentProvider().logout();
    localStorage.removeItem('tonium_provider');
  }

  setProvider(providerName: string, additionaInitParams?: {}) {
    if (!this.providers[providerName]) {
      return false;
    }
    this.provider = new (this.getProviders()[providerName])(
      additionaInitParams,
    ) as AbstractProvider;

    setLogin(this.dispatch, true);

    if (!localStorage.getItem('tonium_provider')) {
      toast.success('SUCCESS', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }

    localStorage.setItem('tonium_provider', providerName);

    return true;
  }

  getCurrentProvider() {
    // eslint-disable-next-line no-debugger
    return this.provider;
  }

  async getApiSignature() {
    const provider = this.getCurrentProvider();
    if (!provider) {
      throw new Error('Please login by provider first');
    }
    const [network, publicKey] = await Promise.all([
      provider.getNetwork(),
      provider.getPublicKey(false),
    ]);
    const message = await provider.signMessage({ network, publicKey });

    return `${publicKey}:${message}`;
  }
}

export default TiniumNFT;
