/**
 * 银行卡缓存
 */
export default class CardCache {
  constructor(count = 10) {
    // 内部缓存已匹配成功结果，便于快速查询。最多缓存10条记录
    this.cache = [];
    this.maxCacheCount = count || 10;
  }

  /**
   * 搜索缓存数据
   * 
   * @private
   * @param {String} cardNo 
   */
  search(cardNo) {
    let ret = [];
    this.cache.some(item => {
      if (cardNo.indexOf(item[0]) === 0) {
        ret = item[1];
        return true;
      }
      return false;
    });
    return ret;
  }

  /**
   * 添加数据
   * 
   * @private
   * @param {*} data ['cardBin', [{}, {}]]
   */
  add(data) {
    if(data.length <= 0 || !data[0] || !data[0].cardBin){
      return;
    }

    const ret = [data[0].cardBin, data];

    if (this.cache.length >= this.maxCacheCount) {
      this.cache.shift();
    }
    this.cache.push(ret);
  }
}