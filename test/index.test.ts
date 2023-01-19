import { banks, cards, searchCardBin, validateCardInfo, CardType, CardTypeName } from '../src';

describe('banks', () => {
  it('should be defined', () => {
    expect(banks).toBeDefined();
  });

  it('banks length', () => {
    expect(banks.length).toBe(271);
  });

  it(`some data`, () => {
    expect(banks.find((item) => item.code === 'ABC')).toEqual({
      code: 'ABC',
      name: '中国农业银行'
    });
    expect(banks.find((item) => item.code === 'ICBC')).toEqual({
      code: 'ICBC',
      name: '中国工商银行'
    });
    expect(banks.find((item) => item.code === 'ZZCCB')).toEqual({
      code: 'ZZCCB',
      name: '郑州商业银行'
    });
  });
});

describe('CardType, CardTypeName', () => {
  it('should be defined', () => {
    expect(CardType).toBeDefined();
    expect(CardTypeName).toBeDefined();
  });

  it(`enum value`, () => {
    expect(CardType.CC).toBe('CC');
    expect(CardType.DC).toBe('DC');
    expect(CardType.PC).toBe('PC');
    expect(CardType.SCC).toBe('SCC');

    expect(CardTypeName.CC).toBe('信用卡');
    expect(CardTypeName.DC).toBe('储蓄卡');
    expect(CardTypeName.PC).toBe('预付费卡');
    expect(CardTypeName.SCC).toBe('准贷记卡');
  });
});

describe('cards', () => {
  it('should be defined', () => {
    expect(cards).toBeDefined();
  });

  it(`cards length`, () => {
    expect(cards.length).toBe(1691);
  });
});

const value1 = '1036545546576812345';
const value2 = '6212824565761234567';

const data1 = {
  bankCode: 'ABC',
  bankName: '中国农业银行',
  cardBin: '103',
  cardType: 'DC',
  cardTypeName: '储蓄卡',
  len: 19
};
const data2 = {
  bankCode: 'ABC',
  bankName: '中国农业银行',
  cardBin: '621282',
  cardType: 'DC',
  cardTypeName: '储蓄卡',
  len: 19
};

const defineData = cards.filter((item) => item.bankCode === 'ABC' && /^62/.test(item.cardBin));

describe('searchCardBin', () => {
  it('should be defined', () => {
    expect(searchCardBin).toBeDefined();
  });

  it('全部数据', () => {
    expect(searchCardBin(value1)).toEqual(data1);
    expect(searchCardBin(value2)).toEqual(data2);
    expect(searchCardBin(value1, { multiple: true })).toEqual([data1]);
    expect(searchCardBin(value2, { multiple: true })).toEqual([data2]);
  });

  it('自定义数据', () => {
    const defineSearchCardBin = (cardNo = '', multiple = false) => {
      return searchCardBin(cardNo, { multiple, data: defineData });
    };

    expect(defineSearchCardBin(value1)).toEqual(null);
    expect(defineSearchCardBin(value2)).toEqual(data2);

    expect(defineSearchCardBin(value1, true)).toEqual([]);
    expect(defineSearchCardBin(value2, true)).toEqual([data2]);
  });

  it('undefined or null', () => {
    // @ts-ignore
    expect(searchCardBin()).toEqual(null);
    // @ts-ignore
    expect(searchCardBin(null)).toEqual(null);
  });
});

describe('validateCardInfo', () => {
  it('should be defined', () => {
    expect(validateCardInfo).toBeDefined();
  });

  it('全部数据', () => {
    expect(validateCardInfo(value1)).toEqual({
      validated: true,
      errorCode: '',
      message: '',
      cardInfo: data1
    });
    expect(validateCardInfo(value2)).toEqual({
      validated: true,
      errorCode: '',
      message: '',
      cardInfo: data2
    });
  });

  it('自定义数据', () => {
    const defineValidateCardInfo = (cardNo = '') => {
      return validateCardInfo(cardNo, { data: defineData });
    };

    expect(defineValidateCardInfo(value1)).toEqual({
      validated: false,
      errorCode: '01',
      message: '找不到该银行卡号',
      cardInfo: null
    });
    expect(defineValidateCardInfo(value2.substring(0, 10))).toEqual({
      validated: false,
      errorCode: '02',
      message: '银行卡号格式错误',
      cardInfo: null
    });
    expect(defineValidateCardInfo(value2)).toEqual({
      validated: true,
      errorCode: '',
      message: '',
      cardInfo: data2
    });
  });
});
