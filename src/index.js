import BankCardClass from './BankCardClass';
import cardType from './data/cardType';

const { bank, bankCardBin, format, cardBin, validateCardInfo } = new BankCardClass();

export {
  bank, 
  bankCardBin, 
  format,
  cardBin, 
  validateCardInfo,

  cardType, 
  BankCardClass
};
