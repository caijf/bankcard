# bankcard

[![npm](https://img.shields.io/npm/v/bankcard.svg)](https://npmjs.com/package/bankcard) ![GitHub](https://img.shields.io/github/license/caijf/bankcard.svg) [![Build Status](https://travis-ci.org/caijf/bankcard.svg?branch=master)](https://travis-ci.org/caijf/bankcard)

通过银行卡号查询银行卡信息，支持浏览器端和 node 端

- [bankcard](#bankcard)
  - [安装](#安装)
  - [使用](#使用)
  - [示例](#示例)
  - [API](#api)
    - [searchCardBin](#searchcardbin)
    - [validateCardInfo](#validatecardinfo)
    - [banks](#banks)
    - [cards](#cards)
    - [CardType](#cardtype)
    - [CardTypeName](#cardtypename)
  - [其他](#其他)

## 安装

```shell
npm install bankcard
```

```shell
yarn add bankcard
```

```shell
pnpm add bankcard
```

## 使用

- **`es`**

```javascript
import { searchCardBin } from 'bankcard';
searchCardBin('622305453434432224');
```

- **`node`**

```javascript
const { searchCardBin } = require('bankcard');
searchCardBin('622305453434432224');
```

- **浏览器引入**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `bankcard` 。

`npm` 包的 `bankcard/dist` 目录下提供了 `bankcard.js` 以及 `bankcard.min.js`。你也可以通过 [UNPKG](https://unpkg.com/bankcard@latest/dist/) 进行下载。或者在测试中直接使用 [UNPKG 线上版本](https://unpkg.com/bankcard@latest/dist/bankcard.min.js)<sup>注意版本</sup> 。

```javascript
<script src="https://unpkg.com/bankcard@latest/dist/bankcard.min.js"></script>
<script>
  bankcard.searchCardBin("622305453434432224");
  bankcard.validateCardInfo("622305453434432224");
</script>
```

## 示例

- [查询所有银行卡](https://re3d4b.csb.app/)
- [仅查询【中国农业银行】【中国工商银行】【62】开头的银行卡](https://73e493.csb.app/)
- [仅查询【62】开头的信用卡](https://qsstkd.csb.app/)
- [浏览器直接引入](https://9ez3ui.csb.app/)
- [node 中使用](https://codesandbox.io/s/node-zhong-shi-yong-ggk38e?file=/index.js)

## API

```typescript
type CardInfo = {
  bankName: string; // 银行名称
  bankCode: string; // 银行编码
  cardBin: string; // 银行卡卡Bin
  cardType: CardType; // 卡类型
  cardTypeName: CardTypeName; // 卡类型名称
  len: number; // 卡号长度
};
```

### searchCardBin

根据银行卡号查询卡 Bin 的银行卡信息。

```typescript
searchCardBin(bankCardNo: string, options?: {
  multiple?: boolean;  // 支持查询多个值，返回结果将变成数组，默认 false 。不常用，仅少数不同银行的卡 bin 存在重复。
  data?: CardInfo[]; // 自定义数据
});
```

无结果返回 `null`，有结果返回：`CardInfo` 。

_当 `multiple=true` ，返回：`CardInfo[]` 。_

### validateCardInfo

验证银行卡号。

```typescript
validateCardInfo(bankCardNo: string, options?: {
  data?: CardInfo[]; // 自定义数据
});
```

返回：

```typescript
{
  validated: boolean, // 验证结果
  errorCode: string; // 错误码
  message: string, // 错误信息
  cardInfo: CardInfo | null; // 当验证成功返回 CardInfo ，否则返回 null
}
```

先查询卡 Bin，再校验卡号长度。如果验证失败 `validated` 为 `false` 。

`errorCode` `message` 有以下值：

| errorCode | message          |
| --------- | ---------------- |
| 01        | 找不到该银行卡号 |
| 02        | 银行卡号格式错误 |

### banks

全部银行列表。

```typescript
[
  {
    code: 'ABC',
    name: '中国农业银行'
  }
  // ...
];
```

### cards

全部银行卡信息列表。

```typescript
CardInfo[];
```

### CardType

卡类型。

```typescript
{
  DC: "DC",
  CC: "CC",
  SCC: "SCC",
  PC: "PC"
}
```

### CardTypeName

卡类型名称。

```typescript
{
  DC: "储蓄卡",
  CC: "信用卡",
  SCC: "准贷记卡",
  PC: "预付费卡"
}
```

## 其他

- 为什么不采用[Luhn 算法](https://baike.baidu.com/item/Luhn算法/22799984)校验卡号？

部分银行卡不符合 Luhn 算法。如招商银行的运通卡、中国银行借记卡等等。可参阅《[支付宝为什么不采用银行卡 Luhn 算法校验卡号？](https://www.zhihu.com/question/21729157)》。
