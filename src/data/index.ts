import banks from './banks';
import bin from './bin';
import { CardType, CardTypeName } from './constants';

const cards = bin.map((item) => {
  let bankName = '';
  banks.some((bankItem) => {
    if (item.bank === bankItem.code) {
      bankName = bankItem.name;
    }
  });

  return {
    bankName: bankName,
    bankCode: item.bank,
    cardBin: item.bin,
    cardType: item.type,
    cardTypeName: CardTypeName[item.type],
    len: item.len
  };
});

export { banks, CardType, CardTypeName, cards };
