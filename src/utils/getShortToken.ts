const getShortToken = (str: string) => str.replace(/(.{6}).+(.{4})/, '$1...$2');

export default getShortToken;
