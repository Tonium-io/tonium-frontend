const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { https } = require('follow-redirects');
// eslint-disable-next-line import/no-extraneous-dependencies
const tmp = require('tmp');
// eslint-disable-next-line import/no-extraneous-dependencies
const AdmZip = require('adm-zip');
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require('prettier');

const download = async (url) =>
  new Promise((resolve, reject) => {
    const tmpobj = tmp.fileSync();
    const file = fs.createWriteStream(tmpobj.name);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve(tmpobj)); // close() is async, call cb after close completes.
        });
      })
      .on('error', (err) => {
        // Handle errors
        tmpobj.removeCallback();
        reject(new Error(err));
      });
  });

const updateContract = async () => {
  const rawdata = await fs.promises.readFile('./src/blockchain/contracts.json');
  const contractsData = JSON.parse(rawdata);

  // eslint-disable-next-line no-restricted-syntax
  for (const [contractName, contractData] of Object.entries(contractsData)) {
    // eslint-disable-next-line no-await-in-loop
    const file = await download(contractData.zip);

    const zip = new AdmZip(file.name);
    const baseFile = contractData.zip.split('#')[1];

    zip.forEach((zipEntry) => {
      if (zipEntry.entryName === `${baseFile}.abi.json`) {
        const abi = JSON.parse(zipEntry.getData().toString());
        contractsData[contractName].abi = abi;
      } else if (zipEntry.entryName === `${baseFile}.tvc`) {
        const tvc = zipEntry.getData().toString('base64');
        contractsData[contractName].tvc = tvc;
      }
    });

    console.log(`${contractName} done`);

    file.removeCallback();
  }
  const jsonfile = prettier.format(JSON.stringify(contractsData), {
    parser: 'json',
  });
  await fs.promises.writeFile('./src/blockchain/contracts.json', jsonfile);
};

updateContract();
