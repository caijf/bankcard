const bankcard = require('bankcard');

const val = bankcard.cardBin('62128243546');

console.log(val);

const bin1 = bankcard.format(bankcard.bankCardBin[0])

console.log(bin1);