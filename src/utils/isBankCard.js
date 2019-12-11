const regBankCard = /^[1-9]\d{14,18}$/;

/**
 * 校验是否为银行卡号
 * @param {String} value 银行卡号
 */
export default function isBankCard(value){
  return regBankCard.test(value);
}