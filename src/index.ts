import { banks, cards, CardType, CardTypeName } from './data';
import isBankCard from './utils/isBankCard';

export type CardInfo = typeof cards[0];

// 验证错误信息
const ValidateErrorInfo = {
  NotFound: {
    code: '01',
    message: '找不到该银行卡号'
  },
  FormatError: {
    code: '02',
    message: '银行卡号格式错误'
  }
};

// 数字校验规则
const regNumber = /^\d+$/;

// 匹配银行卡 bin
function matchCardBin(bankCardNo = '', cardBin = '') {
  if (!bankCardNo || !cardBin) {
    return false;
  }
  return bankCardNo.indexOf(cardBin) === 0;
}

// 根据传入的数据源，搜索银行卡信息
// 存在部分不同银行的卡Bin相同，但卡号长度不同。如622303和622305，16位是南京银行，18位是中国工商银行。所以cardBin查询时，如果卡号输入不完整，只给第一个结果。
// 当前有以下卡Bin存在重复：690755,622442,622425,622302,622308,622309,622510,622162,622307,622303,622305,621260
export function searchCardBin(
  bankCardNo: string,
  options: { multiple: true; data?: typeof cards }
): CardInfo[];
export function searchCardBin(
  bankCardNo: string,
  options?: { multiple?: boolean; data?: typeof cards }
): null | CardInfo;
export function searchCardBin(bankCardNo = '', { multiple = false, data = cards } = {}) {
  const realBankCardNo = bankCardNo || '';

  if (multiple) {
    if (realBankCardNo.length < 3 || !regNumber.test(realBankCardNo)) {
      return [];
    }
    return data.filter((item) => matchCardBin(realBankCardNo, item.cardBin));
  }

  if (realBankCardNo.length < 3 || !regNumber.test(realBankCardNo)) {
    return null;
  }
  return data.find((item) => matchCardBin(realBankCardNo, item.cardBin)) || null;
}

// 验证银行卡号
export function validateCardInfo(bankCardNo = '', { data = cards } = {}) {
  const realBankCardNo = bankCardNo || '';

  const ret = {
    validated: false,
    errorCode: '',
    message: ''
  };

  let cardInfo = null;

  if (!isBankCard(realBankCardNo)) {
    ret.errorCode = ValidateErrorInfo.FormatError.code;
    ret.message = ValidateErrorInfo.FormatError.message;
  } else {
    const cardInfos = searchCardBin(realBankCardNo, { multiple: true, data });

    if (cardInfos.length <= 0) {
      ret.errorCode = ValidateErrorInfo.NotFound.code;
      ret.message = ValidateErrorInfo.NotFound.message;
    } else {
      cardInfo = cardInfos.find((item) => item.len === realBankCardNo.length) || null;

      if (cardInfo) {
        ret.validated = true;
      } else {
        ret.errorCode = ValidateErrorInfo.FormatError.code;
        ret.message = ValidateErrorInfo.FormatError.message;
      }
    }
  }

  return {
    ...ret,
    cardInfo
  };
}

export { banks, cards, CardType, CardTypeName };
