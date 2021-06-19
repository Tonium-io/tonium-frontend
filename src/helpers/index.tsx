import web3Utils from 'web3-utils';

export const utf8ToHex = (value: string) =>
  web3Utils.utf8ToHex(value).replace('0x', '');

export const hexToUtf8 = (value: string) => web3Utils.hexToUtf8(`0x${value}`);

export const isImageFile = (fileAsString: string): boolean =>
  fileAsString.includes('image/');
