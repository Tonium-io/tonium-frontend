import axios from 'axios';

class Api {
  getAuthSignature: Function;

  constructor(getAuthSignature: Function) {
    this.getAuthSignature = getAuthSignature;
  }

  async getAxios() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: await this.getAuthSignature(),
      },
    });
    return instance;
  }
}

export default Api;
