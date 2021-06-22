const getShortToken = (str: string) => str.replace(/(.{8}).+(.{4})/, '$1...$2');

export default getShortToken;
