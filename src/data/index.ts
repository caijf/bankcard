import banks from './banks';
import bin from './bin';
import { CardType, CardTypeName } from './constants';

const cards = bin.map(item => {
  const bank = banks.find(bankItem => item.bank === bankItem.code);
  return {
    bankName: bank?.name || '',
    bankCode: item.bank,
    cardBin: item.bin,
    cardType: item.type,
    cardTypeName: CardTypeName[item.type],
    len: item.len
  }
});

export {
  banks,
  CardType,
  CardTypeName,
  cards
}
