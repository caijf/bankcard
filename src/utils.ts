const regBankCard = /^[1-9]\d{14,18}$/;

// 校验是否为银行卡号
export function isBankCard(value: string) {
  return regBankCard.test(value);
}

// 规整化字符串
export function normalizeString(value: any) {
  if (typeof value === 'string') {
    return value;
  }
  return value === void 0 || isNaN(value) ? '' : String(value);
}
