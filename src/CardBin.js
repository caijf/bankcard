import filter from 'lodash.filter';

import CardCache from './CardCache';
import { getAllCard } from './data';
import isBankCard from './utils/isBankCard';
import cloneObject from './utils/cloneObject';

// 数字校验规则
const regNumber = /^\d+$/;

/**
 * 银行卡类
 */
export default class CardBin {
  /**
   * @param {Object} [options={}] 配置项
   * @param {Function} [options.filter] 过滤数据
   * @param {Function} [options.format] 格式化数据
   * @param {Number} [options.maxCacheCount] 最大缓存数，用于加快cardBin查询
   * 
   * @example
   *    const bc = new CardBin({
   *      format: (data)=>{
   *         const { cardBin, cardType, length, ...rest } = data;
   *         return {
   *            ...rest
   *         }
   *      },
   *      filter: (data)=>{
   *          return data.bankCode === 'ABC';
   *      }
   *    })
   */
  constructor(options = {}) {
    this.options = options;

    this.data = cloneObject(getAllCard());
    this.searchCardBin = this.searchCardBin.bind(this);
    this.validateCardInfo = this.validateCardInfo.bind(this);

    // 过滤数据
    if (typeof this.options.filter === 'function') {
      this.data = filter(this.data, this.options.filter);
    }

    // 内部缓存匹配成功结果，便于快速查询
    this.cache = new CardCache(this.options.maxCacheCount || 10);
  }

  /**
   * 获取银行卡信息
   * 
   * @param {String} cardNo 银行卡号
   */
  searchCardBin(cardNo = '', multiple = false) {
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
    let arrRet = this._search(cardNoStr);

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

    if (typeof this.options.format === 'function') {
      ret = multiple ? arrRet.map(this.options.format) : this.options.format(arrRet[0]);
    } else {
      ret = multiple ? arrRet : arrRet[0];
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
  _search(cardNo = '') {
    let ret = this.cache.search(cardNo);

    if (ret.length === 0) {
      this.data.forEach(item => {
        if (cardNo.indexOf(item.cardBin) === 0) {
          ret.push(item);
        }
      });

      if (ret.length > 0) {
        this.cache.add(ret);
      }
    }

    return ret;
  }

  /**
   * 验证银行卡号
   * @param {String} cardNo 卡号
   */
  validateCardInfo(cardNo = '') {
    let ret = {
      validated: false,
      errorCode: '',
      message: ''
    };

    const cardInfo = this.searchCardBin(cardNo);

    if (!cardInfo) {
      if (isBankCard(cardNo)) {
        ret.errorCode = '01';
        ret.message = '找不到该银行卡号';
      }else{
        ret.errorCode = '02';
        ret.message = '格式错误，银行卡号为15至19位数字';
      }

      return ret;
    }

    if (cardInfo.length === cardNo.length) {
      ret.validated = true;
    } else {
      if(isBankCard(cardNo)){
        ret.errorCode = '03';
        ret.message = `该银行卡号长度为${cardInfo.length}位数字`;
      }else{
        ret.errorCode = '02';
        ret.message = '格式错误，银行卡号为15至19位数字';
      }
    }

    return {
      ...ret,
      ...cardInfo
    };
  }
}
