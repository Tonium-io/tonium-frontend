const fs = require('fs');

console.log('Do an postinstall');
console.log('Copy tonclient.wasm to public');

fs.copyFileSync(
  './node_modules/@tonclient/lib-web/tonclient.wasm',
  './public/tonclient.wasm',
);

console.log('Copy tonclient.wasm to public. Done');
