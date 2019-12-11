import ajax from './ajax';

const ALIPAYAPI = (cardNo) => {
  return `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=${cardNo}&cardBinCheck=true`;
};

/**
 * 阿里验证卡号接口
 * @param {String}} cardNo 卡号
 */
export function validateAndCacheCardInfo(cardNo){
  return ajax({
    url: ALIPAYAPI(cardNo)
  });
}
