const { searchCardBin, validateCardInfo } = require('bankcard');


const cardNo = '62128243546';
const ret1 = searchCardBin(cardNo);
const ret2 = validateCardInfo(cardNo);

console.log(ret1);
console.log(ret2);