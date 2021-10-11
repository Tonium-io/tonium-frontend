import web3Utils from 'web3-utils';

import { hexToUtf8 } from 'src/helpers';
import { zeroAddress } from 'src/constants';
import AbstractProvider from '../providers/AbstractProvider';
import contracts from '../contracts.json';

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
    const localStorageCollections = localStorage.getItem('tonuim_userNFT');
    if (localStorageCollections) {
      try {
        userNFTs = JSON.parse(localStorageCollections);
      } catch (e) {
        throw new Error('Json parse error');
      }
    }

    if (!userNFTs.length) return [];

    const collectionsData: any = [];
    const tokensData: any = [];
    userNFTs.forEach((collection: string) => {
      collectionsData.push(this.getCollectionData(collection));
      // tokensData.push(this.getLastInfoTokenFiles(collection));
    });

    const [collections, tokens]: any = [
      await Promise.all(collectionsData),
      await Promise.all(tokensData),
    ];

    return collections.map((collection: any, index: number) => ({
      ...collection,
      ...tokens[index],
      name: collection.name,
      description: collection.symbol,
    }));
  }

  async getMintNfts(address: string) {
    let newUserNFTs = [];

    const provider = await this.getCurrentProvider();

    if (address) {
      // newUserNFTs = JSON.parse(localStorageCollections);

      // await Promise.all([
      // ...newUserNFTs.map(async (elem: any) => {

      const name = await provider.run('TNFTCoreNftRoot', '_name', {}, address);

      const lastMintedToken = await this.getLastMintedToken(address);
      /* eslint no-underscore-dangle: 0 */

      const newLsit = await Array.from(Array(+lastMintedToken).keys());

      newUserNFTs = await newLsit.map(async (itr) => {
        const val = await provider.run(
          'TNFTCoreNftRoot',
          'resolveData',
          {
            addrRoot: address,
            name: name._name,
            id: itr,
          },
          address,
        );

        const nextVal = await provider.run(
          'TNFTCoreData',
          'getInfo',
          {},
          val.addrData,
        );

        return nextVal;
      });
      // })
      // ])

      newUserNFTs = await Promise.all(newUserNFTs);
    }

    newUserNFTs = await newUserNFTs.map((collection: any) => ({
      ...collection,
      metadata: JSON.parse(web3Utils.hexToUtf8(`0x${collection.metadata}`)),
    }));

    newUserNFTs = await newUserNFTs.map(async (collection: any) => ({
      ...collection,
      metadata: {
        name: collection.metadata.name,
        tokenFileAddress: await Promise.all([
          provider.run(
            'files',
            'm_raw_data_chunks',
            {},
            collection.metadata.tokenFileAddress,
          ),
        ]),
      },
    }));

    newUserNFTs = await Promise.all(newUserNFTs);

    newUserNFTs = await newUserNFTs.map(async (collection: any) => ({
      ...collection,
      metadata: {
        name: collection.metadata.name,
        tokenFileAddress: collection.metadata.tokenFileAddress.map((val: any) =>
          val.m_raw_data_chunks.join(),
        )[0],
      },
    }));
    newUserNFTs = await Promise.all(newUserNFTs);

    return newUserNFTs;
  }

  // async deployNFTWallet(address: string) {
  //   const provider = await this.getCurrentProvider();
  //   const controllerAddress = await provider.getAddress();

  //   const deployNFT = await provider.call(
  //     'controller',
  //     'deployNFT',
  //     {
  //       root_token: address,
  //     },
  //     controllerAddress,
  //   );
  //   return deployNFT;
  // }

  async getLastInfoTokenFiles(address: string) {
    const provider = await this.getCurrentProvider();
    const lastMintedToken = await this.getLastMintedToken(address);

    if (lastMintedToken === '0') return null;

    const infoToken = await provider.run(
      'TNFTCoreNftRoot',
      '_totalMinted',
      {
        tokenId: lastMintedToken,
      },
      address,
    );

    if (infoToken.data === zeroAddress) {
      let ipfsFile = '';
      let ipfsImage = '';
      if (infoToken.jsonMeta) {
        try {
          const meta = JSON.parse(hexToUtf8(infoToken.jsonMeta));
          ipfsFile = meta.ipfsFile;
          ipfsImage = meta.ipfsImage;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Parse error');
        }
      }
      return {
        ipfsFile,
        ipfsImage,
      };
    }

    const chunks = await provider.run(
      'files',
      'getDetails',
      {},
      infoToken.data,
    );
    const file = hexToUtf8(chunks.chunks.join(''));

    return {
      file,
    };
  }

  async getInfoTokens(address: string) {
    const provider = await this.getCurrentProvider();
    let lastMintedToken = await this.getLastMintedToken(address);
    let results: any = [];

    if (lastMintedToken === '0') return results;

    while (lastMintedToken) {
      const getInfoToken = provider.run(
        'TNFTCoreData',
        'getInfo',
        {
          tokenId: lastMintedToken,
        },
        address,
      );
      results.push(getInfoToken);
      lastMintedToken -= 1;
    }
    results = await Promise.all(results);
    // console.log('results', results);

    let ipfsResults: any[] = [];
    let bcResults: any[] = [];
    results.forEach((token: any) =>
      token.data === zeroAddress
        ? ipfsResults.push(token)
        : bcResults.push(token),
    );

    ipfsResults = ipfsResults.map((token: any) => {
      let description = '';
      let ipfsFile = '';
      let ipfsImage = '';
      if (token.jsonMeta) {
        try {
          const meta = JSON.parse(hexToUtf8(token.jsonMeta));
          description = meta.description;
          ipfsFile = meta.ipfsFile;
          ipfsImage = meta.ipfsImage;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Parse error');
        }
      }
      return {
        data: token.data,
        time: token.time,
        name: hexToUtf8(token.name),
        description,
        ipfsFile,
        ipfsImage,
      };
    });

    let bcChunks: any = [];
    bcResults.forEach((bsResult: any) =>
      bcChunks.push(provider.run('files', 'getDetails', {}, bsResult.data)),
    );
    bcChunks = await Promise.all(bcChunks);
    bcResults = bcResults.map((token: any, index: number) => {
      let description = '';
      if (token.jsonMeta) {
        try {
          const meta = JSON.parse(hexToUtf8(token.jsonMeta));
          description = meta.description;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Parse error');
        }
      }
      const file = hexToUtf8(bcChunks[index].chunks.join(''));
      return {
        data: token.data,
        time: token.time,
        name: hexToUtf8(token.name),
        description,
        file,
      };
    });

    return [...ipfsResults, ...bcResults];
  }

  async getTokenBlockchainData(address: string) {
    const provider = await this.resolveProviderOrThrow();
    const res = provider.run('files', 'getDetails', {}, address);
    return res;
  }

  async checkController(
    noMoneyFallback: (addr: string, value: number) => void,
  ) {
    const provider = await this.resolveProviderOrThrow();
    const address = await provider.getAddress();
    const balance = await provider.getBalance(address);
    const accType = await provider.getContractStatus(address);
    // const fallback =  noMoneyFallback(address,100000000);
    if (balance < 3) {
      const money = await provider.sendMoney(address, 5);
      console.log('Money', money);
    }
    if (accType !== 1) {
      await provider.deployContract('controller', noMoneyFallback);
    }
  }

  async createUserCollections(
    name: string,
    // symbol: string,
    noMoneyFallback: (addr: string, value: number) => void,
  ) {
    const provider = await this.resolveProviderOrThrow();

    // const walletContract = await Object.getPrototypeOf(
    //   provider,
    // ).constructor.getContractRaw('wallet');

    await this.checkController(noMoneyFallback);

    const addrOwner = await provider.getAddress();
    // console.log('Addr Owner', addrOwner);

    const codeDataTvc = await provider.getCodeFromTvc(
      contracts.TNFTCoreData.tvc,
    );
    // console.log('codeDataTvc', codeDataTvc);

    // console.log("vakuess", {
    //   // randomKey: Math.floor(10000000000 + Math.random() * 900000000),
    //   _name: web3Utils.utf8ToHex(name).replace('0x', ''),
    //   _addrOwner: addrOwner,
    // })

    const contractAddress = await provider.deployContract(
      'TNFTCoreNftRoot',
      noMoneyFallback,
      {
        // randomKey: Math.floor(10000000000 + Math.random() * 900000000),
        _name: web3Utils.utf8ToHex(name).replace('0x', ''),
        _addrOwner: addrOwner,
      },
      {
        // name: web3Utils.utf8ToHex(name).replace('0x', ''),
        // symbol: web3Utils.utf8ToHex(symbol).replace('0x', ''),
        // decimals: 0,
        // root_public_key: provider.getPublicKey(true),
        codeData: codeDataTvc,
        codeIndex: await provider.getCodeFromTvc(contracts.TNFTCoreIndex.tvc),
      },
      false,
    );

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

  async createUserCollectionToken(
    address: string,
    // name: string,
    jsonMeta: any,
    // data: string,
    noMoneyFallback: (addr: string, value: number) => void,
  ) {
    const provider = await this.resolveProviderOrThrow();
    const addressWallet = await provider.getAddress();
    await this.checkController(noMoneyFallback);
    // eslint-disable-next-line no-console
    // const currentMintedToken = +(await this.getLastMintedToken(address)) + 1;wsx

    const result = await provider.call(
      'controller',
      'mintNFT',
      {
        // tokenId: currentMintedToken,
        // name: web3Utils.utf8ToHex(name).replace('0x', ''),
        rootNFT: address,
        metadata: web3Utils
          .utf8ToHex(JSON.stringify(jsonMeta))
          .replace('0x', ''),
        // data,
      },
      addressWallet,
    );

    // console.log("Minted Token", result)
    return result;
    // const wallets = await provider.run(
    //   'controller',
    //   'm_wallets',
    //   {},
    //   addressWallet,
    // );
    //
    // await provider.call(
    //   'rootToken',
    //   'grant',
    //   {
    //     dest: wallets.m_wallets[address],
    //     tokenId: currentMintedToken,
    //     grams: 0,
    //   },
    //   address,
    // );
  }

  async createUserCollectionTokenFile(
    chunks: any[],
    noMoneyFallback: (addr: string, value: number) => void,
  ) {
    const provider = await this.resolveProviderOrThrow();
    // eslint-disable-next-line no-console
    console.log('Chunks length: ', chunks.length);
    const contractAddress = await provider.deployContract(
      'files',
      noMoneyFallback,
      { nonce: Math.floor(Math.random() * 100000) },
      { chunks_count: chunks.length },
    );
    // eslint-disable-next-line no-console
    console.log('Files contract deploy success.', contractAddress);
    // eslint-disable-next-line no-console
    console.log(
      'Writing to file.',
      `Start: ${new Date().getMinutes()}:${new Date().getSeconds()}`,
    );
    await Promise.all([
      ...chunks.map((chunk: string, index: number) =>
        provider.call('files', 'writeData', { index, chunk }, contractAddress),
      ),
    ]);
    // eslint-disable-next-line no-console
    console.log('Written to file, file address: ', contractAddress);
    return contractAddress;
  }

  async getCollectionData(address: string) {
    const provider = await this.resolveProviderOrThrow();
    const data = await Promise.all([
      provider.run('TNFTCoreNftRoot', '_totalMinted', {}, address),
      // provider.run('TNFTCoreNftRoot', 'getSymbol', {}, address),
      // provider.run('TNFTCoreNftRoot', 'getTotalSupply', {}, address),
    ]);

    const name = await provider.run('TNFTCoreNftRoot', '_name', {}, address);

    return {
      address,
      name: web3Utils.hexToUtf8(`0x${name._name}`),
      // symbol: web3Utils.hexToUtf8(`0x${data[1].value0}`),
      // totalSupply: data[2].value0,
      totalSupply: data,
    };
  }

  async getLastMintedToken(address: string) {
    const provider = await this.resolveProviderOrThrow();

    const data = await provider.run(
      'TNFTCoreNftRoot',
      '_totalMinted',
      {},
      address,
    );
    /* eslint no-underscore-dangle: 0 */
    return data._totalMinted;
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
  // putEditCollection(tooken: {}) {
  //   const editToken = {};
  //   return editToken;
  // } //  редактирование колллекции

  // eslint-disable-next-line class-methods-use-this
  getAllNFTAuctions() {
    const aunctions: [] = [];
    return aunctions; // получение всех аукционов
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // postAunctionMark(auction: {}) {
  //   const markAuction = {};
  //   return markAuction; // mark auction
  // }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // postAunctionBid(auction: {}) {
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  // const bid = {};
  // return auction;
  // } // do bid

  // eslint-disable-next-line class-methods-use-this
  getAllNFTs() {
    const nfts: [] = [];
    return nfts; // получение всех нфтешек для радара
  }
}

export default Actions;
