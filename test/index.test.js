import {
  expect
} from 'chai';

import { bank, cardType, getAllCard, CardBin } from '../src';

describe('bank', () => {
  it(`ABC 中国农业银行`, () => {
    expect(bank['ABC']).to.be.equal('中国农业银行');
  });
  it('ICBC 中国工商银行', () => {
    expect(bank['ICBC']).to.be.equal('中国工商银行');
  });
  it('ZZCCB 郑州商业银行', () => {
    expect(bank['ZZCCB']).to.be.equal('郑州商业银行');
  });
});

describe('cardType', () => {
  it(`DC 储蓄卡`, () => {
    expect(cardType['DC']).to.be.equal('储蓄卡');
  });
  it(`CC 信用卡`, () => {
    expect(cardType['CC']).to.be.equal('信用卡');
  });
  it(`SCC 准贷记卡`, () => {
    expect(cardType['SCC']).to.be.equal('准贷记卡');
  });
  it(`PC 预付费卡`, () => {
    expect(cardType['PC']).to.be.equal('预付费卡');
  });
});

const allCard = getAllCard();

describe('getAllCard', () => {
  it(`数据长度`, () => {
    expect(allCard.length > 0).to.be.equal(true);
  });
  it('包含 bankName, bankCode, cardBin, cardType, cardTypeName, length 这些字段', () => {
    const { bankName, bankCode, cardBin, cardType, cardTypeName, length } = allCard[0];
    expect(!!bankName && !!bankCode && !!cardBin && !!cardType && !!cardTypeName && !!length).to.be.equal(true);
  });
});

const regCardBin = /^62/;
const bc = new CardBin({
  filter: data => {
    return data.bankCode === 'ABC' && regCardBin.test(data.cardBin);
  }
});
const invalidValue = "1036545546576812345";
const validValue = "6212824565761234567";

describe('CardBin - 仅查询【中国农业银行】【62】开头的银行卡', () => {
  it(`data 数据长度`, () => {
    const dataLen = bc.data.length;
    expect(dataLen > 0).to.be.equal(true);
  });
  it('searchCardBin 单个银行卡号匹配无结果, 返回 null', () => {
    expect(bc.searchCardBin(invalidValue)).to.be.equal(null);
  });
  it('searchCardBin 单个银行卡号匹配有结果, 返回 对象', () => {
    const { bankName, bankCode, cardBin, cardType, cardTypeName, length } = bc.searchCardBin(validValue);
    expect(!!bankName && !!bankCode && !!cardBin && !!cardType && !!cardTypeName && !!length).to.be.equal(true);
  });
  it('searchCardBin 多个银行卡号匹配无结果, 返回 []', () => {
    const ret = bc.searchCardBin(invalidValue, true);
    expect(Array.isArray(ret) && ret.length === 0).to.be.equal(true);
  });
  it('searchCardBin 多个银行卡号匹配有结果, 返回 数组', () => {
    const ret = bc.searchCardBin(validValue, true);
    expect(Array.isArray(ret) && ret.length > 0).to.be.equal(true);
  });
  it('validateCardInfo 校验格式错误, validated 为 false', () => {
    const ret = bc.validateCardInfo("1234567");
    expect(ret.validated).to.be.equal(false);
  });
  it('validateCardInfo 校验被过滤的银行卡号, validated 为 false', () => {
    const ret = bc.validateCardInfo(invalidValue);
    expect(ret.validated).to.be.equal(false);
  });
  it('validateCardInfo 校验卡号长度不正确, validated 为 false', () => {
    const ret = bc.validateCardInfo(validValue.substr(0, 15));
    expect(ret.validated).to.be.equal(false);
  });
  it('validateCardInfo 校验正确, validated 为 true', () => {
    const ret = bc.validateCardInfo(validValue);
    expect(ret.validated).to.be.equal(true);
  });
});