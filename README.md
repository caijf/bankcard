# bankcard

![GitHub](https://img.shields.io/github/license/caijf/bankcard.svg)
[![Build Status](https://travis-ci.org/caijf/bankcard.svg?branch=master)](https://travis-ci.org/caijf/bankcard)

通过银行卡号查询银行卡信息，支持浏览器端（es5、es6）和node

- [安装](#安装)
- [使用](#使用)
- [示例](#示例)
- [API](#API)
	- [bank](#bank) - 所有银行的键值对
	- [cardType](#cardType) - 所有卡类型的键值对
	- [getAllCard()](#getAllCard()) - 获取全部银行卡信息
	- [CardBin类](#CardBin类) - 用于创建银行卡卡Bin的实例
- [其他](#其他)

## 安装

```shell
npm install bankcard
```

## 使用

- **浏览器引入 `es5`**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `bankcard` 。

`npm` 包的 `bankcard/dist` 目录下提供了 `bankcard.js` 以及 `bankcard.min.js`。你也可以通过 [UNPKG](https://unpkg.com/bankcard@latest/dist/) 进行下载。

```javascript
<script src="https://unpkg.com/browse/bankcard@2/dist/bankcard.min.js"></script>
<script>
  const bc = bankcard.CardBin("10354");
  bc.searchCardBin("622305453434432224");
  bc.validateCardInfo("622305453434432224");
</script>
```

- **`es6`**

```javascript
import { CardBin } from 'bankcard';

const bc = new CardBin();
bc.searchCardBin("622305453434432224");
```

- **`umd` `node`**

```javascript
const { CardBin } = require('bankcard');

const bc = new CardBin();
bc.searchCardBin("622305453434432224");
```

## 示例

- [查询所有银行卡](https://codesandbox.io/s/vigilant-bhabha-jmff4?fontsize=14&hidenavigation=1&theme=dark)
- [仅查询【中国农业银行】【中国工商银行】【62】开头的银行卡](https://codesandbox.io/s/determined-heisenberg-xu6kk?fontsize=14&hidenavigation=1&theme=dark)
- [仅查询【62】开头的信用卡](https://codesandbox.io/s/determined-heisenberg-xu6kk?fontsize=14&hidenavigation=1&theme=dark)
- [浏览器直接引入](https://codesandbox.io/s/thirsty-matsumoto-tw028?fontsize=14&hidenavigation=1&theme=dark)
- [node中使用](https://codesandbox.io/s/cocky-swirles-s8yzo?fontsize=14&hidenavigation=1&theme=dark)

## API

### bank

所有银行的键值对。

```javascript
{
  ABC: '中国农业银行',
  // ...
}
```

### cardType

所有卡类型的键值对。

```
{
  DC: "储蓄卡",
  CC: "信用卡",
  SCC: "准贷记卡",
  PC: "预付费卡"
}
```

### getAllCard()

获取全部银行卡信息。

```javascript
[
  {
    bankName: string, // 银行名称
    bankCode: string, // 银行编码
    cardBin: string, // 银行卡卡bin
    cardType: string, // 卡类型
    cardTypeName: string // 卡类型名称
    length: number // 卡号长度
  }
]
```

### CardBin类

用于创建银行卡卡Bin的实例。

#### new CardBin([options])

- `options` &lt;object&gt; 配置项，主要包含以下字段：
	- `maxCacheCount` &lt;number&gt; 可选。最大缓存数，加快 `searchCardBin` 查询。默认 `10`
	- `format` &lt;function&gt; 可选。格式化 `searchCardBin` `validateCardInfo` 输出，必须要有返回值
	- `filter` &lt;function&gt; 可选。过滤数据，必须返回一个真值以匹配

查询全部银行卡bin：

```javascript
import { CardBin } from 'bankcard';

const bc = new CardBin();
console.log(bc.data);

bc.searchCardBin("622305453434432224");
bc.validateCardInfo("622305453434432224");
```

仅查询【中国农业银行】和【中国工商银行】，卡Bin【62】开头的银行卡，输出数据带时间戳：

```javascript
import { CardBin } from 'bankcard';

const supportBankCode = ['ABC', 'ICBC'];
const regCardBin = /^62/;

const bc = new CardBin({
  filter: data => {
    return supportBankCode.indexOf(data.bankCode) > -1 && regCardBin.test(data.cardBin);
  },
  format: data => {
    return {
      ...data,
      timestamp: Date.now()
    }
  }
});
console.log(bc.data);

bc.searchCardBin("622305453434432224");
bc.validateCardInfo("622305453434432224");
```

#### 实例属性和方法

- **data**

银行卡数据，创建 `CardBin` 实例后生成，格式和 `getAllCard` 一样。


- **searchCardBin(cardNo='', [multiple=false])**

根据银行卡号查询卡Bin，适用于输入银行卡号匹配银行卡信息。

无结果返回 `null`，有结果返回：

```javascript
{
  bankName: string, // 银行名称
  bankCode: string, // 银行编码
  cardBin: string, // 银行卡卡Bin
  cardType: string, // 卡类型
  cardTypeName: string, // 卡类型名称
  length: number // 卡号长度
}
```

如果第二个可选参数为 `true`，返回数组。无结果则返回 `[]`。*(不常用，仅少数不同银行的卡bin存在重复)*

- **validateCardInfo(*cardNo*)**

验证银行卡号。

```javascript
{
  validated: boolean, // 验证结果
  message: string, // 错误信息
  
  // 当卡Bin查询有结果时，才有以下值
  bankName: string,
  bankCode: string,
  cardBin: string,
  cardType: string,
  cardTypeName: string,
  length: number
}
```

先查询卡Bin，然后校验格式，再校验卡Bin和卡号长度。如果验证失败 `validated` 为 `false`，`message` 有以下值：

1. `格式不正确（15-19位数字）`：格式错误，银行卡号为15至19位数字
2. `找不到卡bin`：找不到该银行卡号
3. `卡号长度不对`：该银行卡号长度为x为数字

## 其他

- 为什么不采用[Luhn算法](https://baike.baidu.com/item/Luhn%E7%AE%97%E6%B3%95/22799984)校验卡号？

部分银行卡不符合Luhn算法。如招商银行的运通卡、中国银行借记卡等等。可参阅《[支付宝为什么不采用银行卡Luhn算法校验卡号？](https://www.zhihu.com/question/21729157)》。


