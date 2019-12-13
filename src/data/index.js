import bankList from './bank';
import bin from './bin';
import cardType from './cardType';

const bank = {};

bankList.forEach(item => {
  bank[item.bank] = item.name;
});

let card = null;

/**
 * 格式化银行卡信息
 */
const normalizeCardInfo = (data) => {
  return {
    bankName: bank[data.bank],
    bankCode: data.bank,
    cardBin: data.bin,
    cardType: data.type,
    cardTypeName: cardType[data.type],
    length: data.length
  }
}

/**
 * 获取所有卡列表
 */
function getAllCard(){
  if(!card){
    card = bin.map(item => normalizeCardInfo(item));
  }
  
  return card;
}

export {
  bank,
  cardType,
  getAllCard
}
