const { CardBin, bank, cardType, getAllCard } = require('bankcard');

const bc = new CardBin();

const cardNo = '62128243546';
const ret1 = bc.searchCardBin(cardNo);
const ret2 = bc.validateCardInfo(cardNo);

console.log(ret1);
console.log(ret2);