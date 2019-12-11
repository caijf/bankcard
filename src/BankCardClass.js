import find from 'lodash.find';
import filter from 'lodash.filter';

import bank from './data/bank';
import bankCardBin from './data/bin';
import cardType from './data/cardType';
import isBankCard from './utils/isBankCard';
import cloneObject from './utils/cloneObject';
import { isRegExp } from './utils/isType';

// 数字校验规则
const regNumber = /^[1-9]\d*$/;

/**
 * 转为数组格式
 * 
 * @param {*} data 
 */
function transformToArray(data) {
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
}

/**
 * 创建查询条件。
 * 
 * 正则：直接输出
 * 字符串：转为数组
 * 数组：由字符串组成
 * 
 * @param {*} obj 
 */
function createCondition(obj) {
  if (obj) {
    return transformToArray(obj);
  } else {
    return [];
  }
}

/**
 * 判断值是否符合条件
 * 
 * @param {Array<String|Number|RegExp>} condition 
 * @param {*} val 
 */
function matchCondition(condition, val) {
  if (Array.isArray(condition) && condition.length > 0) {
    let ret = false;

    condition.some(item => {
      if (isRegExp(item)) {
        if (item.global) {
          item.lastIndex = 0; // 防止全局匹配的开始位置错误
        }

        ret = item.test(val);
      } else if (typeof item === 'string' || typeof item === 'number') {
        ret = item === val;
      }
      return ret;
    });

    return ret;
  } else {
    return false;
  }
}

/**
 * 是否符合包含条件
 * 
 * @param {Array<String|Number|RegExp>} condition 
 * @param {*} val 
 */
function includeMatchCondition(condition, val) {
  if (condition && condition.length > 0) {
    return matchCondition(condition, val);
  }
  return true;
}

/**
 * 是否符合排除条件
 * 
 * @param {Array<String|Number|RegExp>} condition 
 * @param {*} val 
 */
function excludeMatchCondition(condition, val) {
  if (condition && condition.length > 0) {
    return matchCondition(condition, val);
  }
  return false;
}

/**
 * 银行卡类
 */
export default class BankCardClass {
  /**
   * 
   * @param {Object} opts 
   * @param {Object} [opts.include={}] 包含
   * @param {Array<String|RegExp>|String|RegExp} [opts.include.bank] 银行编码
   * @param {Array<String|RegExp>|String|RegExp} [opts.include.bin] 卡bin
   * @param {Array<Number|RegExp>|Number|RegExp} [opts.include.length] 银行卡长度
   * @param {Array<String|RegExp>|String|RegExp} [opts.include.type] 银行卡类型
   * @param {Object} opts.exclude 排除
   * @param {Array<String|RegExp>|String|RegExp} [opts.exclude.bank] 银行编码
   * @param {Array<String|RegExp>|String|RegExp} [opts.exclude.bin] 卡bin
   * @param {Array<Number|RegExp>|Number|RegExp} [opts.exclude.length] 银行卡长度
   * @param {Array<String|RegExp>|String|RegExp} [opts.exclude.type] 银行卡类型
   * 
   * @example
   *    {
   *      include: {
   *        bank: ['ABC', 'ICBC'],
   *        type: 'CC'
   *      },
   *      exclude: {
   *        bin: ['103'],
   *        length: 16
   *      }
   *    }
   */
  constructor(options = {}) {
    this.options = options;

    this.bank = cloneObject(bank);
    this.bankCardBin = cloneObject(bankCardBin);


    // 内部缓存已匹配成功结果，便于快速查询。最多缓存10条记录
    this._cache = [];
    this._cacheMaxLength = 10;

    this._filterData = this._filterData.bind(this);
    this._updateCacheCardBin = this._updateCacheCardBin.bind(this);
    this._searchCardBin = this._searchCardBin.bind(this);

    this.format = this.format.bind(this);
    this.cardBin = this.cardBin.bind(this);
    this.validateCardInfo = this.validateCardInfo.bind(this);

    this._filterData();
  }

  /**
   * 过滤数据
   * 
   * @private
   */
  _filterData() {
    const { include = {}, exclude = {} } = this.options;

    const incBankCondition = createCondition(include.bank);
    const incBinCondition = createCondition(include.bin);
    const incTypeCondition = createCondition(include.type);
    const incLengthCondition = createCondition(include.length);

    const excBankCondition = createCondition(exclude.bank);
    const excBinCondition = createCondition(exclude.bin);
    const excTypeCondition = createCondition(exclude.type);
    const excLengthCondition = createCondition(exclude.length);

    const hasBankCondition = incBankCondition.length > 0 || excBankCondition.length > 0;

    const hasCondition = (
      hasBankCondition ||
      incBinCondition.length > 0 ||
      incTypeCondition.length > 0 ||
      incLengthCondition.length > 0 ||
      excBinCondition.length > 0 ||
      excTypeCondition.length > 0 ||
      excLengthCondition.length > 0
    );

    if (hasBankCondition) {
      this.bank = filter(this.bank, item => {
        return includeMatchCondition(incBankCondition, item.bank) && !excludeMatchCondition(excBankCondition, item.bank);
      });
    }

    if (hasCondition) {
      this.bankCardBin = this.bankCardBin.filter(item => {
        return (
          includeMatchCondition(incBankCondition, item.bank) &&
          includeMatchCondition(incBinCondition, item.bin) &&
          includeMatchCondition(incTypeCondition, item.type) &&
          includeMatchCondition(incLengthCondition, item.length) &&
          !excludeMatchCondition(excBankCondition, item.bank) &&
          !excludeMatchCondition(excBinCondition, item.bin) &&
          !excludeMatchCondition(excTypeCondition, item.type) &&
          !excludeMatchCondition(excLengthCondition, item.length)
        );
      });
    }
  }

  /**
   * 格式化输出银行卡信息
   */
  format(data) {
    const bankCode = data.bank;
    const bankObj = find(this.bank, item => item.bank === data.bank) || {};
    const bankName = bankObj.name;

    return {
      bankName,
      bankCode,
      cardType: data.type,
      cardTypeName: cardType[data.type],
      length: data.length
    }
  }

  /**
   * 获取银行卡信息
   * 
   * @param {String} cardNo 银行卡号
   */
  cardBin(cardNo = '', multiple = false) {
    let ret = multiple ? [] : null;

    // 校验参数
    const cardNoType = typeof cardNo;
    if (cardNoType !== 'string' && cardNoType !== 'number' && !regNumber.test(cardNo)) {
      console.error('银行卡号不正确');
      return ret;
    }

    const cardNoStr = String(cardNo);

    // 长度小于3，直接返回
    if (cardNoStr.length < 3) {
      return ret;
    }

    // 查询结果
    let arrRet = this._searchCardBin(cardNoStr);

    if (arrRet.length === 0) {
      return ret;
    }

    // 校验长度，存在相同卡bin，不同银行的情况。
    // 判断银行卡号长度，如果等于卡bin长度，输出该卡信息；如果大于某张卡bin长度，只返回更长那张卡信息。
    let matchLengthRet = filter(arrRet, item => {
      return item.length === cardNoStr.length;
    });

    arrRet = matchLengthRet.length === 1 ? matchLengthRet : arrRet;

    if (matchLengthRet.length === 1) {
      arrRet = matchLengthRet;
    } else {
      matchLengthRet = filter(arrRet, item => {
        return item.length > cardNoStr.length;
      });

      arrRet = matchLengthRet.length === 1 ? matchLengthRet : arrRet;
    }

    // 输出多个数据
    if (multiple) {
      ret = arrRet.map(this.format);
    } else {
      ret = this.format(arrRet[0]);
    }

    return ret;
  }

  /**
   * 根据传入的数据源，搜索卡bin。客户端搜索做缓存处理，加快后续查找速度
   * 存在部分不同银行的卡Bin相同，但卡号长度不同。如622303和622305，16位是南京银行，18位是中国工商银行。所以cardBin查询时，如果卡号输入不完整，只给第一个结果。
   * 当前有以下卡Bin存在重复：
   * 690755,622442,622425,622302,622308,622309,622510,622162,622307,622303,622305,621260
   * 
   * @private
   */
  _searchCardBin(cardNo = '') {
    let ret = [];

    this._cache.some(item => {
      if (cardNo.indexOf(item[0]) === 0) {
        ret = item[1];
        return true;
      }
      return false;
    });

    if (ret.length === 0) {
      this.bankCardBin.forEach(item => {
        if (cardNo.indexOf(item.bin) === 0) {
          ret.push(item);
        }
      });

      if (ret.length > 0) {
        this._updateCacheCardBin([ret[0].bin, ret]);
      }
    }

    return ret;
  }

  /**
   * 更新缓存搜索卡bin
   * 
   * @private
   * @param {*} data 
   */
  _updateCacheCardBin(data) {
    if (this._cache.length >= this._cacheMaxLength) {
      this._cache.shift();
    }
    this._cache.push(data);
  }

  /**
   * 验证银行卡号
   * @param {String} cardNo 卡号
   */
  validateCardInfo(cardNo = '') {
    let ret = {
      validated: false,
      message: ''
    };

    const cardInfo = this.cardBin(cardNo);

    if (!cardInfo) {
      ret.message = isBankCard(cardNo) ? '找不到该银行卡号' : '格式错误，银行卡号为15至19位数字';

      return ret;
    }

    if (cardInfo.length === cardNo.length) {
      ret.validated = true;
    } else {
      ret.message = isBankCard(cardNo) ? `该银行卡号长度为${cardInfo.length}位数字` : '格式错误，银行卡号为15至19位数字';
    }

    return {
      ...ret,
      ...cardInfo
    };
  }
}